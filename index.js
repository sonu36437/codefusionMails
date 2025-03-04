require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const { connectToDatabase } = require('./connection');
const mailModel = require('./model/mailData');

const app = express();
let db;


// async function connectToDb(){
//  db=  await connectToDatabase();
//  console.log(db);
 
// }




app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD
  }
});

app.get('/',async(req,res)=>{

  
  return res.status(200).json({msg:'health fine'});

})





app.post('/send-email', async (req, res) => {
  try {
 
    const { email, name, text ,phone_number} = req.body;
     if(!phone_number){
      return res.status(400).json({ message: 'phone number is required' });
     }

    if(!email){
      return res.status(400).json({ message: 'email is required' });
    }
 
    if (!email || !text) {
      return res.status(400).json({ message: 'email and text fields a,re required' });
    }
    const emailTemplate = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #1F5B88; text-align: center;">New Message from ${name}</h2>
        
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone_number}</p>
        <p style="border-top: 1px solid #ddd; padding-top: 10px;">
            ${text}
        </p>

        <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #555;">
            <p>Sent from My Website</p>
        </footer>
    </div>
`;


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }


    const mailOptions = {
      from: 'sonu36437@gmail.com',
      to: "sonu36437@gmail.com",
      subject: "message from portfolio",
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
   await mailModel.create({email:email,name:name,message:text,phone_number:phone_number})
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ message: 'Failed to send email', details: error });
  }
});

app.get('/get-mails/:date', async (req, res) => {
  try {
    const date = req.params.date;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const mails = await mailModel.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });
    res.json(mails);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});





const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {

  await connectToDatabase();

  console.log("connected");
  

  
  console.log(`Server is running on port ${PORT}`);

});
