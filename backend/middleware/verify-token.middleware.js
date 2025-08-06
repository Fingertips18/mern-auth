import { jwtVerify } from 'jose';

import { secretKey } from '../constants/keys.constant.js';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = (await jwtVerify(token, secretKey)).payload;

    if (!payload || !payload.userId) {
      throw new Error('Invalid token!');
    }

    req.userId = payload.userId;

    next();
  } catch (error) {
    console.error('Error verifying token!', error);
    return res.status(500).json({ message: error.message });
  }
};
