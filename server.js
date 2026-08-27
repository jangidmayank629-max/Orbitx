const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'orbitx.marketing@gmail.com';

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

/**
 * Health check route
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'OrbitX Marketing API', timestamp: new Date().toISOString() });
});

/**
 * Contact Form Submission Endpoint
 */
app.post(['/api/contact', '/api/send-email', '/contact'], async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate Input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields (Name, Email, Message) are required to initiate sequence.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const sanitizedName = String(name).trim().slice(0, 150);
    const sanitizedEmail = String(email).trim().slice(0, 200);
    const sanitizedMessage = String(message).trim().slice(0, 5000);
    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // HTML Email Template with OrbitX Cyber Neon Aesthetics
    const htmlEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0e0e10; color: #e5e1e4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #131315; border: 1px solid rgba(208, 188, 255, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 0 30px rgba(208, 188, 255, 0.15); }
          .header { background: linear-gradient(135deg, #201f21, #0e0e10); padding: 30px 24px; border-bottom: 2px solid #d0bcff; text-align: center; }
          .logo { font-size: 28px; font-weight: 800; color: #d0bcff; letter-spacing: -1px; margin: 0; }
          .badge { display: inline-block; background: rgba(76, 215, 246, 0.15); color: #4cd7f6; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; padding: 4px 12px; border-radius: 20px; margin-top: 8px; border: 1px solid rgba(76, 215, 246, 0.3); }
          .content { padding: 30px 24px; }
          .field-group { margin-bottom: 20px; background: #1c1b1d; padding: 16px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); }
          .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #958ea0; letter-spacing: 1px; margin-bottom: 4px; }
          .field-value { font-size: 16px; color: #e5e1e4; word-break: break-word; }
          .message-box { background: #201f21; border-left: 4px solid #4cd7f6; padding: 16px; border-radius: 4px; margin-top: 8px; font-size: 15px; line-height: 1.6; color: #e5e1e4; white-space: pre-wrap; }
          .footer { padding: 20px 24px; text-align: center; font-size: 12px; color: #958ea0; border-top: 1px solid rgba(255, 255, 255, 0.05); background: #0e0e10; }
          .reply-btn { display: inline-block; background: #d0bcff; color: #3c0091; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 50px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">OrbitX Marketing</h1>
            <div class="badge">🚀 Incoming Mission Request</div>
          </div>
          <div class="content">
            <div class="field-group">
              <div class="field-label">Sender Name</div>
              <div class="field-value"><strong>${sanitizedName}</strong></div>
            </div>
            <div class="field-group">
              <div class="field-label">Sender Email</div>
              <div class="field-value"><a href="mailto:${sanitizedEmail}" style="color: #4cd7f6; text-decoration: none;">${sanitizedEmail}</a></div>
            </div>
            <div class="field-group">
              <div class="field-label">Target Location / Source</div>
              <div class="field-value">Mahwa, Rajasthan (321608) | Website Contact Form</div>
            </div>
            <div class="field-group">
              <div class="field-label">Mission Transmission</div>
              <div class="message-box">${sanitizedMessage}</div>
            </div>
            <div style="text-align: center;">
              <a href="mailto:${sanitizedEmail}?subject=Re:%20OrbitX%20Mission%20Inquiry%20from%20${encodeURIComponent(sanitizedName)}" class="reply-btn">Direct Reply to Sender</a>
            </div>
          </div>
          <div class="footer">
            Received at: ${submissionTime} IST<br/>
            OrbitX Marketing Dynamics &bull; Fueling the next digital frontier
          </div>
        </div>
      </body>
      </html>
    `;

    // OPTION A: If Resend API Key is provided
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const resendResponse = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'OrbitX Contact <onboarding@resend.dev>',
        to: RECIPIENT_EMAIL,
        reply_to: sanitizedEmail,
        subject: `🚀 OrbitX Mission Inquiry: ${sanitizedName}`,
        html: htmlEmailContent,
        text: `New contact submission from ${sanitizedName} (${sanitizedEmail}):\n\n${sanitizedMessage}\n\nReceived at: ${submissionTime}`
      });

      return res.status(200).json({
        success: true,
        message: 'Mission sequence initiated and transmitted to OrbitX via Resend.',
        data: resendResponse
      });
    }

    // OPTION B: Nodemailer with Gmail SMTP or custom SMTP
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_gmail_app_password_here') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: `"OrbitX Web Signal" <${process.env.EMAIL_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: sanitizedEmail,
        subject: `🚀 OrbitX Mission Inquiry: ${sanitizedName}`,
        text: `New mission request from ${sanitizedName} (${sanitizedEmail}):\n\n${sanitizedMessage}\n\nTime: ${submissionTime}`,
        html: htmlEmailContent
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: 'Mission sequence initiated and transmitted to orbitx.marketing@gmail.com.'
      });
    }

    // DEVELOPMENT / DEMO FALLBACK: If credentials are not yet populated in .env
    console.log('\n=============================================');
    console.log('📡 [ORBITX SIGNAL SIMULATED - CREDENTIALS NOTICE]');
    console.log('No EMAIL_USER / EMAIL_PASS or RESEND_API_KEY configured in .env yet.');
    console.log(`To send live emails to ${RECIPIENT_EMAIL}, update .env with your Gmail App Password or Resend API key.`);
    console.log('--- TRANSMISSION PAYLOAD ---');
    console.log(`From: ${sanitizedName} <${sanitizedEmail}>`);
    console.log(`Message: ${sanitizedMessage}`);
    console.log('=============================================\n');

    return res.status(200).json({
      success: true,
      message: 'Sequence acknowledged! (Simulated transmission mode. Configure .env with Gmail App Password or Resend API key for live inbox delivery).',
      mock: true
    });

  } catch (error) {
    console.error('Transmission error:', error);
    return res.status(500).json({
      success: false,
      error: 'Signal transmission encountered atmospheric interference. Please try again or email directly to orbitx.marketing@gmail.com.',
      details: error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 OrbitX Marketing Server live on http://localhost:${PORT}`);
  console.log(`🎯 Recipient configured: ${RECIPIENT_EMAIL}`);
});
