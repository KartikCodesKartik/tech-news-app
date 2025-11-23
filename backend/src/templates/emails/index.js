/**
 * Email Templates Index
 * Professional HTML email templates for Tech News App
 */

const baseTemplate = require('./baseTemplate');
const welcomeEmail = require('./welcomeEmail');
const passwordResetEmail = require('./passwordResetEmail');
const newsletterEmail = require('./newsletterEmail');
const notificationEmail = require('./notificationEmail');

module.exports = {
  baseTemplate,
  welcomeEmail,
  passwordResetEmail,
  newsletterEmail,
  notificationEmail
};
