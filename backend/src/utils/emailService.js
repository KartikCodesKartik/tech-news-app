const nodemailer = require('nodemailer');

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
  const html = `
    <h1>Welcome ${name}!</h1>
    <p>Your account has been created successfully.</p>
    <p>You can now log in and start managing tech news articles.</p>
    <p>Best regards,<br>Tech News Team</p>
  `;
  await sendEmail({ to: email, subject, html });
};

const sendPasswordResetEmail = async (email, name, resetUrl) => {
  const subject = 'Password Reset Request';
  const html = `
    <h1>Hello ${name}</h1>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Best regards,<br>Tech News Team</p>
  `;
  await sendEmail({ to: email, subject, html });
};

const sendNewsletterEmail = async (email, article) => {
  const subject = `New Article: ${article.title}`;
  const html = `
    <h1>${article.title}</h1>
    <p>${article.excerpt}</p>
    <a href="${process.env.FRONTEND_URL}/article/${article._id}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Read More</a>
    <p>Best regards,<br>Tech News Team</p>
  `;
  await sendEmail({ to: email, subject, html });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNewsletterEmail
};
