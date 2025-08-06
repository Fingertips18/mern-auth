import emailjs from '@emailjs/nodejs';
import dotenv from 'dotenv';

import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_MESSAGE_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from '../templates/email.template.js';
import { AuthRoutes } from '../constants/routes.constant.js';

dotenv.config();

const serviceID = process.env.EMAILJS_SERVICE_ID;
if (!serviceID) {
  throw new Error('Service ID is required');
}

const templateID = process.env.EMAILJS_TEMPLATE_ID;
if (!templateID) {
  throw new Error('Template ID is required');
}

const publicKey = process.env.EMAILJS_PUBLIC_KEY;
if (!publicKey) {
  throw new Error('Public key is required');
}

const privateKey = process.env.EMAILJS_PRIVATE_KEY;
if (!privateKey) {
  throw new Error('Private key is required');
}

const clientURL = process.env.CLIENT_URL;
if (!clientURL) {
  throw new Error('Client URL is required');
}

const EmailService = {
  sendEmailVerification: async (username, email, token) => {
    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        {
          email: email,
          subject: 'Verify your email',
          html: VERIFICATION_EMAIL_TEMPLATE.replace(
            '{verificationCode}',
            token,
          ).replace('{username}', username),
        },
        {
          publicKey: publicKey,
          privateKey: privateKey,
        },
      );

      console.log('Email verification sent successfully!', response);
    } catch (error) {
      console.error('Error sending verification email!', error);
      throw new Error(`Error sending verification email: ${error.message}`);
    }
  },
  sendWelcomeMessage: async (username, email) => {
    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        {
          email: email,
          subject: 'Welcome to MERN Auth',
          html: WELCOME_MESSAGE_TEMPLATE.replace('{username}', username),
        },
        {
          publicKey: publicKey,
          privateKey: privateKey,
        },
      );

      console.log('Welcome email sent successfully!', response);
    } catch (error) {
      console.error('Error sending welcome email!', error);
      throw new Error(`Error sending welcome email: ${error}`);
    }
  },
  sendEmailResetPassword: async (username, email, resetToken) => {
    const resetURL = `${clientURL}${AuthRoutes.resetPassword.path}/${resetToken}`;

    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        {
          email: email,
          subject: 'Reset Password',
          html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
            '{resetURL}',
            resetURL,
          ).replace('{username}', username),
        },
        {
          publicKey: publicKey,
          privateKey: privateKey,
        },
      );

      console.log('Password reset request email sent successfully!', response);
    } catch (error) {
      console.error('Error sending reset password email!', error);
      throw new Error(`Error sending reset password email: ${error}`);
    }
  },
  sendEmailResetSuccess: async (username, email) => {
    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        {
          email: email,
          subject: 'Password Reset Successful',
          html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{username}', username),
        },
        {
          publicKey: publicKey,
          privateKey: privateKey,
        },
      );

      console.log('Password reset email success sent successfully!', response);
    } catch (error) {
      console.error('Error sending reset password success email!', error);
      throw new Error(`Error sending reset password success email: ${error}`);
    }
  },
};

export { EmailService };
