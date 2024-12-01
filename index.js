require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD
  }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { to, text } = req.body;

    // Email options
    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: to,
      subject: "message form portfolio",
      text: text,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
