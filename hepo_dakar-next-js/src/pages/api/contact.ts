import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  if (req.method === "POST") {
    // Send Email
    const { name, email, message } = req.body;
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Set up email data with unicode symbols
    let mailOptions = {
      from: `"${name}" <${email}>`, // Sender's address
      replyTo: email,
      to: process.env.GMAIL_USER, // Receiver's address
      subject: 'New Contact Form Submission', // Subject line
      text: message, // Plain text body
      html: `<p>${message}</p>`, // HTML body content
    };

    try {
      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send email', error });
    }
    
    res.status(200).json({ message: "Form submitted successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
  