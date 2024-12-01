require('dotenv').config();

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
      html: `<h4>${email}<h4><br> <p>${text}</p>`,
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
