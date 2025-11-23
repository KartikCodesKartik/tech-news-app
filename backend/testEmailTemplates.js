/**
 * Email Template Test Script
 * 
 * This script generates sample HTML files for each email template
 * to visually verify the templates render correctly.
 * 
 * Usage: node testEmailTemplates.js
 */

const fs = require('fs');
const path = require('path');

// Set environment variable for testing
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const {
  welcomeEmail,
  passwordResetEmail,
  newsletterEmail,
  notificationEmail
} = require('./src/templates/emails');

const outputDir = path.join(__dirname, 'email-previews');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating email template previews...\n');

// 1. Test Welcome Email
console.log('1. Generating welcome email...');
const welcomeHtml = welcomeEmail('John Doe', 'john.doe@example.com', {
  loginUrl: 'http://localhost:3000/login',
  dashboardUrl: 'http://localhost:3000/admin/dashboard'
});
fs.writeFileSync(path.join(outputDir, '1-welcome-email.html'), welcomeHtml);
console.log('   ✓ Saved to email-previews/1-welcome-email.html\n');

// 2. Test Password Reset Email
console.log('2. Generating password reset email...');
const passwordResetHtml = passwordResetEmail(
  'Jane Smith',
  'http://localhost:3000/reset-password/abc123token456',
  { expirationTime: '1 hour' }
);
fs.writeFileSync(path.join(outputDir, '2-password-reset-email.html'), passwordResetHtml);
console.log('   ✓ Saved to email-previews/2-password-reset-email.html\n');

// 3. Test Newsletter Email
console.log('3. Generating newsletter email...');
const sampleArticle = {
  _id: '507f1f77bcf86cd799439011',
  title: 'The Future of Artificial Intelligence: Trends to Watch in 2024',
  excerpt: 'Explore the cutting-edge developments in AI technology that are set to transform industries and reshape our digital landscape in the coming year.',
  category: 'Artificial Intelligence',
  readTime: '8 min read',
  imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  author: {
    name: 'Sarah Johnson'
  },
  publishedAt: new Date(),
  contentPreview: '<p>As we step into 2024, artificial intelligence continues to evolve at an unprecedented pace. From generative AI breakthroughs to enhanced machine learning models, the landscape is shifting rapidly...</p>'
};

const newsletterHtml = newsletterEmail(sampleArticle, {
  unsubscribeUrl: 'http://localhost:3000/newsletter/unsubscribe?email=subscriber@example.com',
  moreArticlesUrl: 'http://localhost:3000'
});
fs.writeFileSync(path.join(outputDir, '3-newsletter-email.html'), newsletterHtml);
console.log('   ✓ Saved to email-previews/3-newsletter-email.html\n');

// 4. Test Notification Email (Success)
console.log('4. Generating success notification email...');
const successNotification = {
  type: 'success',
  title: 'Article Published Successfully',
  greeting: 'Hi John,',
  message: 'Congratulations! Your article "Understanding Quantum Computing" has been successfully published and is now live on Tech News.',
  details: [
    'Article ID: TN-2024-0123',
    'Published: January 15, 2024 at 10:30 AM',
    'Category: Quantum Computing',
    'Estimated Reach: 5,000+ subscribers'
  ],
  steps: [
    'Share your article on social media platforms',
    'Engage with readers in the comments section',
    'Monitor article analytics in your dashboard',
    'Consider writing a follow-up article on related topics'
  ],
  stepsTitle: 'Recommended Next Steps:',
  additionalInfo: 'Your article will be included in this week\'s newsletter, reaching thousands of tech enthusiasts.',
  closingText: 'Thank you for your valuable contribution to the Tech News community!',
  signature: 'Best regards,<br><strong>The Tech News Editorial Team</strong>',
  preheader: 'Your article is now live and reaching readers'
};

const successNotificationHtml = notificationEmail(successNotification, {
  actionUrl: 'http://localhost:3000/article/TN-2024-0123',
  actionText: 'View Your Article'
});
fs.writeFileSync(path.join(outputDir, '4-notification-success.html'), successNotificationHtml);
console.log('   ✓ Saved to email-previews/4-notification-success.html\n');

// 5. Test Notification Email (Info)
console.log('5. Generating info notification email...');
const infoNotification = {
  type: 'info',
  title: 'Account Activity Update',
  greeting: 'Hello Jane,',
  message: 'We wanted to inform you about recent activity on your Tech News account.',
  details: 'Your account was accessed from a new device on January 14, 2024 at 2:45 PM EST from San Francisco, California.',
  additionalInfo: 'If this was you, no action is needed. If you don\'t recognize this activity, please secure your account immediately.',
  closingText: 'We\'re committed to keeping your account secure.',
  preheader: 'New activity detected on your account'
};

const infoNotificationHtml = notificationEmail(infoNotification, {
  actionUrl: 'http://localhost:3000/account/security',
  actionText: 'Review Security Settings'
});
fs.writeFileSync(path.join(outputDir, '5-notification-info.html'), infoNotificationHtml);
console.log('   ✓ Saved to email-previews/5-notification-info.html\n');

// 6. Test Notification Email (Warning)
console.log('6. Generating warning notification email...');
const warningNotification = {
  type: 'warning',
  title: 'Action Required: Verify Your Email Address',
  greeting: 'Hi there,',
  message: 'Your email address needs to be verified to continue using all features of Tech News.',
  details: 'Your account will be limited until email verification is complete.',
  steps: [
    'Click the verification button below',
    'Check your inbox for the verification email',
    'Click the verification link in that email',
    'Return to Tech News and start using all features'
  ],
  additionalInfo: 'This verification link will expire in 24 hours.',
  preheader: 'Please verify your email address'
};

const warningNotificationHtml = notificationEmail(warningNotification, {
  actionUrl: 'http://localhost:3000/verify-email',
  actionText: 'Verify Email Now'
});
fs.writeFileSync(path.join(outputDir, '6-notification-warning.html'), warningNotificationHtml);
console.log('   ✓ Saved to email-previews/6-notification-warning.html\n');

// 7. Test Notification Email (Error)
console.log('7. Generating error notification email...');
const errorNotification = {
  type: 'error',
  title: 'Payment Failed',
  greeting: 'Dear valued customer,',
  message: 'We were unable to process your recent payment for the Tech News Premium subscription.',
  details: [
    'Transaction ID: TXN-2024-789',
    'Amount: $9.99',
    'Date: January 15, 2024',
    'Reason: Card declined'
  ],
  additionalInfo: 'Your subscription will expire in 3 days if payment is not completed.',
  closingText: 'Please update your payment method to continue enjoying Tech News Premium features.',
  preheader: 'Action required: Payment failed'
};

const errorNotificationHtml = notificationEmail(errorNotification, {
  actionUrl: 'http://localhost:3000/billing/update-payment',
  actionText: 'Update Payment Method'
});
fs.writeFileSync(path.join(outputDir, '7-notification-error.html'), errorNotificationHtml);
console.log('   ✓ Saved to email-previews/7-notification-error.html\n');

console.log('✅ All email template previews generated successfully!');
console.log(`\nOpen the files in the '${outputDir}' directory to view the templates in your browser.`);
console.log('\nTest checklist:');
console.log('  [ ] Open each HTML file in a browser');
console.log('  [ ] Verify responsive design (resize browser window)');
console.log('  [ ] Check all links and buttons');
console.log('  [ ] Verify colors and typography');
console.log('  [ ] Test in different email clients if possible');
console.log('  [ ] Confirm mobile rendering\n');
