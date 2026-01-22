import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';

export const registerUser = async (payload) => {
  const existingUser = await UserCollection.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashedPassword,
  });

  return {
    user: newUser,
  };
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  await SessionCollection.deleteOne({ userId: user._id });
  return SessionCollection.create({
    userId: user._id,
    accessToken: crypto.randomBytes(32).toString('base64'),
    refreshToken: crypto.randomBytes(32).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    refreshTokenValidUntil: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
  });

  // return {
  //   user,
  // };
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};
