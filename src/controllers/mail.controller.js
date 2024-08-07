// mail.controller.js
import nodemailer from 'nodemailer';

export const sendMail = async (req, res) => {
    const { name, email, message } = req.body;

    // Log the received data to check if it's correct
    console.log('Received data:', { name, email, message });

    // Set up the transporter with your email service credentials
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Set up email data
    let mailOptions = {
        from: email,
        to: 'queries4kothakunj@gmail.com', // Receiver's email address
        subject: `Contact Form Submission from ${name}`,
        text: message,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to send email' });
    }
};
