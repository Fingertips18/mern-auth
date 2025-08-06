import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import { generateTokenCookie } from '../utils/generate-token-cookie.js';
import { EmailService } from '../utils/email-service.js';
import User from '../models/user.model.js';

const AuthController = {
  signUp: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        throw new Error('Some of the fields are missing!');
      }

      const userAlreadyExists = await User.findOne({ email });

      if (userAlreadyExists) {
        throw new Error('User already exists!');
      }

      const hashedPassword = await bcryptjs.hash(password, 12);
      const verificationToken = Math.floor(
        1000 + Math.random() * 9000,
      ).toString();

      const user = new User({
        username,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      await user.save();

      await generateTokenCookie(res, user._id);

      await EmailService.sendEmailVerification(
        user.username,
        user.email,
        verificationToken,
      );

      return res.status(201).json({
        message: 'User created successfully',
      });
    } catch (error) {
      console.error('Sign up failed!', error);
      res.status(409).json({ message: error.message });
    }
  },
  signIn: async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw new Error('Missing email or password!');
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid credentials!');
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid credentials!');
      }

      await generateTokenCookie(res, user._id);

      user.lastSignedIn = new Date();

      await user.save();

      res.status(200).json({
        message: 'Signed in successfully!',
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } catch (error) {
      console.error('Sign in failed!', error);
      res.status(401).json({ message: error.message });
    }
  },
  signOut: async (_, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Signed out successfully!' });
  },
  verifyEmail: async (req, res) => {
    const { token } = req.body;

    try {
      if (!token) {
        throw new Error('Missing token!');
      }

      const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });

      if (!user) {
        throw new Error('Invalid or expired verification token!');
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;

      await user.save();

      await EmailService.sendWelcomeMessage(user.username, user.email);

      res.status(200).json({
        message: 'Email verified successfully!',
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } catch (error) {
      console.error('Email verification failed!', error);
      res.status(400).json({ message: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      if (!email) {
        throw new Error('Missing email!');
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Email doesn't exist!");
      }

      const resetPasswordToken = crypto.randomBytes(64).toString('hex');

      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

      user.save();

      await EmailService.sendEmailResetPassword(
        user.username,
        user.email,
        resetPasswordToken,
      );

      res.status(200).json({
        message: 'Password resent link has been sent to your email!',
      });
    } catch (error) {
      console.error('Forgot password failed!', error);
      res.status(401).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
      if (!token || !password) {
        throw new Error('Token or password is missing!');
      }

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() },
      });

      if (!user) {
        throw new Error('Invalid or expired reset token!');
      }

      const hashedPassword = await bcryptjs.hash(password, 12);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;

      await user.save();

      await EmailService.sendEmailResetSuccess(user.username, user.email);

      res.status(200).json({ message: 'Password reset successful!' });
    } catch (error) {
      console.error('Reset password failed', error);
      res.status(400).json({ message: error.message });
    }
  },
  verifyToken: async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        throw new Error('User not found!');
      }

      res.status(200).json({
        message: 'Token is still valid!',
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } catch (error) {
      console.error('Verify token failed', error);
      res.status(401).json({ message: error.message });
    }
  },
};

export default AuthController;
