# 🌌 OrbitX Marketing - High-Velocity Digital Agency Web Platform

This repository contains the complete frontend landing page and backend contact API for **OrbitX Marketing**, optimized for **Local SEO in Mahwa, Rajasthan (PIN: 321608)** and featuring an interactive mission contact sequence that transmits inquiries directly to `orbitx.marketing@gmail.com`.

---

## 📍 1. Local SEO & Schema Architecture
The `<head>` section of `index.html` has been augmented with comprehensive search engine directives:
- **Target Keywords**: `"best social media marketing agency"`, `"best social media marketing agency in Mahwa Rajasthan"`, `"digital marketing agency Mahwa 321608"`, `"video editing services Mahwa"`, `"ad campaigns Rajasthan"`, `"SEO agency Mahwa"`.
- **Geotargeting Tags**:
  - `geo.region`: `IN-RJ`
  - `geo.placename`: `Mahwa, Rajasthan`
  - `geo.position`: `27.0456;76.9312`
  - `ICBM`: `27.0456, 76.9312`
  - `zipcode`: `321608`
- **JSON-LD Schema**:
  - Structured Graph combining `@type: ["LocalBusiness", "ProfessionalService"]` with verified GPS coordinates, service offerings, business hours, telephone (`+91 8302664761`), email (`orbitx.marketing@gmail.com`), and geographical coverage area.

---

## ⚡ 2. Contact Sequence & Backend Options

When a user completes the form and clicks **"Initiate Sequence"**:
1. Client-side validation checks input parameters.
2. Interactive spinner activates (`Transmitting Signal...`).
3. Payload is dispatched to the backend API `/api/contact`.
4. On acknowledgment, a **GSAP cosmic success animation** morphs the card into a holographic confirmation screen displaying transmission details.

### 🛠️ Option A: Node.js / Express Backend (Recommended)

1. **Install Dependencies**:
   ```bash
   cd orbitx-marketing
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   **Using Gmail SMTP (Nodemailer)**:
   - In your Google Account: Go to **Security** &rarr; **2-Step Verification** &rarr; **App Passwords**.
   - Generate an App Password for "Mail".
   - In `.env`:
     ```env
     PORT=5000
     RECIPIENT_EMAIL=orbitx.marketing@gmail.com
     EMAIL_USER=orbitx.marketing@gmail.com
     EMAIL_PASS=your_16_char_app_password
     ```

   **Or Using Resend API**:
   - In `.env`:
     ```env
     PORT=5000
     RECIPIENT_EMAIL=orbitx.marketing@gmail.com
     RESEND_API_KEY=re_your_api_key
     ```

3. **Start the Server**:
   ```bash
   npm start
   ```
   The application will be live at `http://localhost:5000`.

---

### 🌐 Option B: Pure Client-Side EmailJS (For Static Hosting on Netlify / Vercel / GitHub Pages)
If you wish to deploy without running a Node.js server:
1. Create a free account on [EmailJS](https://www.emailjs.com/).
2. Create an Email Service connected to `orbitx.marketing@gmail.com`.
3. In `index.html`, add your Public Key, Service ID, and Template ID before the main script:
   ```html
   <script>
     window.EMAILJS_PUBLIC_KEY = "your_public_key";
     window.EMAILJS_SERVICE_ID = "your_service_id";
     window.EMAILJS_TEMPLATE_ID = "your_template_id";
     emailjs.init(window.EMAILJS_PUBLIC_KEY);
   </script>
   ```
