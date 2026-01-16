import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });

  return {
    user: newUser,
  };
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  return {
    user,
  };
};
