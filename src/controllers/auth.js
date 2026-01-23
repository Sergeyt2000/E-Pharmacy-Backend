import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'User logged in successfully',
    data: { accessToken: session.accessToken },
  });};

export const logoutUserController = async (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (sessionId) {
    await logoutUser(sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(201).send({
    status: 201,
    message: 'User logged out successfully',
  });
};

export const refreshTokenController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshSession(sessionId, refreshToken);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Session refreshed successfully',
    data: { accessToken: session.accessToken },
  });
};
