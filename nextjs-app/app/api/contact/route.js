import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// Simple in-memory rate limiter per IP (max 5 requests per 10 minutes)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'orbitx.marketing@gmail.com';

/**
 * Helper to escape HTML and prevent XSS injection in email clients
 */
function sanitizeInput(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(request) {
  try {
    // 1. IP Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const now = Date.now();
    const clientHistory = rateLimitMap.get(ip) || [];
    const recentRequests = clientHistory.filter(time => now - time < RATE_LIMIT_WINDOW_MS);

    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many transmissions received from your coordinates. Please wait a few minutes before trying again.'
        },
        { status: 429 }
      );
    }
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // 2. Parse Request Body
    const body = await request.json();
    const { name, email, message, honeypot, formLoadedAt } = body;

    // 3. Anti-Spam Check 1: Honeypot Trap
    // Bots automatically fill hidden inputs
    if (honeypot && honeypot.trim() !== '') {
      console.warn(`[SPAM DETECTED] Honeypot filled by IP: ${ip}`);
      // Return 200 OK so bot thinks it succeeded, but drop silently
      return NextResponse.json({ success: true, message: 'Transmission acknowledged.' });
    }

    // 4. Anti-Spam Check 2: Time Trap
    // Submissions faster than 1.5 seconds from page load are automated bots
    if (formLoadedAt) {
      const elapsed = (now - Number(formLoadedAt)) / 1000;
      if (elapsed < 1.5) {
        console.warn(`[SPAM DETECTED] Form submitted too quickly (${elapsed.toFixed(2)}s) by IP: ${ip}`);
        return NextResponse.json({ success: true, message: 'Transmission acknowledged.' });
      }
    }

    // 5. Strict Input Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields (Name, Email, Message) are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()) || email.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (message.trim().length < 5 || message.trim().length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 5 and 5000 characters.' },
        { status: 400 }
      );
    }

    // 6. Sanitize inputs for secure email rendering
    const safeName = sanitizeInput(name.trim());
    const safeEmail = sanitizeInput(email.trim());
    const safeMessage = sanitizeInput(message.trim());
    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 7. Cyber-Themed HTML Email Template for Inbox Notification
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0e0e10; color: #e5e1e4; margin: 0; padding: 24px; }
          .card { max-width: 580px; margin: 0 auto; background: #131315; border: 1px solid rgba(208, 188, 255, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 0 40px rgba(208, 188, 255, 0.15); }
          .header { background: linear-gradient(135deg, #201f21, #0e0e10); padding: 32px 24px; text-align: center; border-bottom: 2px solid #d0bcff; }
          .logo { font-size: 26px; font-weight: 800; color: #d0bcff; letter-spacing: -0.5px; margin: 0; }
          .badge { display: inline-block; background: rgba(76, 215, 246, 0.15); border: 1px solid #4cd7f6; color: #4cd7f6; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 14px; border-radius: 20px; margin-top: 10px; }
          .content { padding: 28px 24px; }
          .field { margin-bottom: 16px; background: #1c1b1d; padding: 14px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); }
          .field-title { font-size: 11px; text-transform: uppercase; color: #958ea0; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; }
          .field-val { font-size: 15px; color: #e5e1e4; }
          .msg-box { background: #201f21; border-left: 4px solid #4cd7f6; padding: 16px; border-radius: 6px; font-size: 15px; line-height: 1.6; color: #e5e1e4; white-space: pre-wrap; margin-top: 6px; }
          .action { text-align: center; margin: 24px 0 10px; }
          .reply-btn { display: inline-block; background: #d0bcff; color: #3c0091; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 50px; font-size: 14px; }
          .footer { text-align: center; font-size: 12px; color: #958ea0; padding: 18px 24px; border-top: 1px solid rgba(255, 255, 255, 0.05); background: #0e0e10; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1 class="logo">OrbitX Marketing</h1>
            <div class="badge">🚀 Incoming Mission Transmission</div>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-title">Client Name</div>
              <div class="field-val"><strong>${safeName}</strong></div>
            </div>
            <div class="field">
              <div class="field-title">Client Email</div>
              <div class="field-val"><a href="mailto:${safeEmail}" style="color: #4cd7f6; text-decoration: none;">${safeEmail}</a></div>
            </div>
            <div class="field">
              <div class="field-title">Target Location</div>
              <div class="field-val">Mahwa, Rajasthan (321608) | Website Contact Form</div>
            </div>
            <div class="field">
              <div class="field-title">Mission Brief</div>
              <div class="msg-box">${safeMessage}</div>
            </div>
            <div class="action">
              <a href="mailto:${safeEmail}?subject=Re:%20OrbitX%20Mission%20Inquiry%20from%20${encodeURIComponent(safeName)}" class="reply-btn">Direct Reply to Client</a>
            </div>
          </div>
          <div class="footer">
            Received: ${submissionTime} IST &bull; OrbitX Dynamics
          </div>
        </div>
      </body>
      </html>
    `;

    // 8. Automated Confirmation Email Sent to the User
    const userConfirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0e0e10; color: #e5e1e4; margin: 0; padding: 24px; }
          .card { max-width: 550px; margin: 0 auto; background: #131315; border: 1px solid rgba(76, 215, 246, 0.3); border-radius: 16px; padding: 32px 24px; text-align: center; }
          .logo { font-size: 26px; font-weight: 800; color: #d0bcff; margin: 0 0 16px; }
          .title { font-size: 22px; color: #ffffff; font-weight: 700; margin-bottom: 12px; }
          .desc { font-size: 14px; color: #cbc3d7; line-height: 1.6; margin-bottom: 24px; }
          .highlight { background: rgba(208, 188, 255, 0.1); border: 1px dashed rgba(208, 188, 255, 0.3); padding: 16px; border-radius: 8px; font-size: 13px; color: #d0bcff; text-align: left; margin-bottom: 24px; }
          .footer { font-size: 12px; color: #958ea0; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">OrbitX Marketing</div>
          <div class="title">Transmission Acknowledged! 🚀</div>
          <p class="desc">
            Hello <strong>${safeName}</strong>,<br/>
            We have received your mission parameters. Our digital marketing flight team in Mahwa, Rajasthan is analyzing your brief and will respond within 24 hours.
          </p>
          <div class="highlight">
            <strong>Your Transmission Summary:</strong><br/>
            "${safeMessage.length > 150 ? safeMessage.substring(0, 150) + '...' : safeMessage}"
          </div>
          <div class="footer">
            OrbitX Marketing Dynamics &bull; Fueling the next digital frontier<br/>
            Mahwa, Rajasthan (321608) | +91 8302664761
          </div>
        </div>
      </body>
      </html>
    `;

    // 9. Delivery Engine Option A: Resend API
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Send to Admin Inbox
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'OrbitX Contact <onboarding@resend.dev>',
        to: RECIPIENT_EMAIL,
        reply_to: safeEmail,
        subject: `🚀 OrbitX Mission Inquiry: ${safeName}`,
        html: adminEmailHtml
      });

      // Send Confirmation to User
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'OrbitX Team <onboarding@resend.dev>',
          to: safeEmail,
          subject: 'OrbitX Marketing - Mission Signal Acknowledged',
          html: userConfirmationHtml
        });
      } catch (userErr) {
        console.warn('User confirmation email skipped in demo sandbox mode:', userErr.message);
      }

      return NextResponse.json({
        success: true,
        message: 'Mission sequence initiated and transmitted to OrbitX via Resend.'
      });
    }

    // 10. Delivery Engine Option B: Nodemailer with Gmail SMTP
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_gmail_app_password_here') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Send to Admin
      await transporter.sendMail({
        from: `"OrbitX Web Signal" <${process.env.EMAIL_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: safeEmail,
        subject: `🚀 OrbitX Mission Inquiry: ${safeName}`,
        html: adminEmailHtml
      });

      // Send Confirmation to User
      try {
        await transporter.sendMail({
          from: `"OrbitX Marketing" <${process.env.EMAIL_USER}>`,
          to: safeEmail,
          subject: 'OrbitX Marketing - Mission Signal Acknowledged',
          html: userConfirmationHtml
        });
      } catch (userErr) {
        console.warn('User confirmation email skipped:', userErr.message);
      }

      return NextResponse.json({
        success: true,
        message: 'Mission sequence transmitted directly to orbitx.marketing@gmail.com.'
      });
    }

    // 11. Fallback for Local / Sandbox Demo when credentials are not yet configured
    console.log('📡 [ORBITX CONTACT SIGNAL LOGGED (DEV MODE)]');
    console.log(`From: ${safeName} <${safeEmail}>`);
    console.log(`Message: ${safeMessage}`);

    return NextResponse.json({
      success: true,
      message: 'Transmission acknowledged! (Development simulation mode active. Set EMAIL_USER & EMAIL_PASS or RESEND_API_KEY in .env for live dispatch).',
      mock: true
    });

  } catch (error) {
    console.error('Contact API Route Exception:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Signal transmission encountered atmospheric interference. Please email directly to orbitx.marketing@gmail.com.'
      },
      { status: 500 }
    );
  }
}
