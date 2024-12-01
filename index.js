require('dotenv').config();


const mailHtml=`<!DOCTYPE html>
<html>
<head>
  <style>
    /* Resetting default margins */
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #FFFFFF;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      border: 1px solid #AFE1AF;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #AFE1AF;
      padding: 20px;
      text-align: center;
    }
    .header h4 {
      margin: 0;
      color: black;
      font-size: 18px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      margin: 0;
      color: black;
      line-height: 1.6;
    }
    .footer {
      background-color: #AFE1AF;
      text-align: center;
      padding: 10px;
      font-size: 14px;
      color: black;
    }
    .name-section {
      color: #FFFFFF;
      background-color: black;
      padding: 10px 20px;
      text-align: center;
      font-size: 18px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Name Section -->
    <div class="name-section">
      <strong>${name}</strong>
    </div>

    <!-- Header -->
    <div class="header">
      <h4>${email}</h4>
    </div>

    <!-- Content -->
    <div class="content">
      <p>${text}</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      Thank you for reaching out!
    </div>
  </div>
</body>
</html>
`

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
   res.send({mg:"heloow"})
})


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD
  }
});


app.post('/send-email', async (req, res) => {
  try {
    const { email, name, text,} = req.body;

    // Check if required fields are present
    if (!email || !text) {
      return res.status(400).json({ error: 'To and text fields are required' });
    }

    // Email options
    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: "sonu36437@gmail.com",
      subject: "message from portfolio",
      html: `<h4>${name}</h4><h4>${email}</h4><br><p>${text}</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
