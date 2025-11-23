const nodemailer = require('nodemailer');
const {
  welcomeEmail,
  passwordResetEmail,
  newsletterEmail,
  notificationEmail
} = require('../templates/emails');

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD
  }
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: `${process.env.BREVO_FROM_NAME} <${process.env.BREVO_FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to Tech News App';
  const html = welcomeEmail(name, email);
  await sendEmail({ to: email, subject, html });
};

const sendPasswordResetEmail = async (email, name, resetUrl) => {
  const subject = 'Password Reset Request';
  const html = passwordResetEmail(name, resetUrl);
  await sendEmail({ to: email, subject, html });
};

const sendNewsletterEmail = async (email, article, options = {}) => {
  const subject = `New Article: ${article.title}`;
  const html = newsletterEmail(article, {
    unsubscribeUrl: options.unsubscribeUrl || `${process.env.FRONTEND_URL}/newsletter/unsubscribe?email=${encodeURIComponent(email)}`
  });
  await sendEmail({ to: email, subject, html });
};

const sendNotificationEmail = async (email, notification, options = {}) => {
  const subject = notification.subject || notification.title;
  const html = notificationEmail(notification, options);
  await sendEmail({ to: email, subject, html });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNewsletterEmail,
  sendNotificationEmail
};
