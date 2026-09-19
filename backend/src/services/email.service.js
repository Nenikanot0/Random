import nodemailer from 'nodemailer';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    redirectUri: 'https://developers.google.com/oauthplayground',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Random" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
export const sendRegistrationEmail = async (userEmail,userName) => {
    const subject = 'Welcome to Our Platform!';
    const text = `Hi ${userName},

    Thank you for registering with us! We are thrilled to have you on board.

    If you have any questions, feel free to reply to this email.

    Best regards,
    The Team`;

    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Welcome, ${userName}!</h2>
        <p>Thank you for registering with us. We're thrilled to have you on board.</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.9em; color: #777;">Best regards,<br/>The Team</p>
        </div>
    `;

    return await sendEmail(userEmail, subject, text, html);
}

export default sendEmail;