import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';

export const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization !== 'string') {
    throw createHttpError(401, 'Invalid authorization header');
  }
  if (!authorization) {
    throw createHttpError(401, 'Authorization header missing');
  }

  const [bearer, accessToken] = authorization.split(' ', 2);
  if (bearer !== 'Bearer' || !accessToken) {
    throw createHttpError(401, 'Invalid authorization format');
  }
  const session = await SessionCollection.findOne({ accessToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired');
  }
  // req.session = session;

  const user = await UserCollection.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  req.user = { id: user._id, name: user.name };

  // console.log('user', req.user);

  next();
};
