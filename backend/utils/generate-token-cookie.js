import { SignJWT } from 'jose';

import { secretKey } from '../constants/keys.constant.js';

export const generateTokenCookie = async (res, userId) => {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
