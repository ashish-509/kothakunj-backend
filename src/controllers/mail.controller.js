
import nodemailer from 'nodemailer';

export const sendMail = async (req, res) => {
    const { name, email, message } = req.body;

    // Set up the transporter with your email service credentials
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password
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
        res.status(500).json({ error: 'Failed to send email' });
    }
};
