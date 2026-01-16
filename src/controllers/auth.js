import { registerUser, loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'User logged in successfully',
    data: user,
  });
};

export const logoutUserController = async (req, res) => {
  // Implementation for logging out a user (e.g., invalidating a token)
  res.status(200).json({
    status: 200,
    message: 'User logged out successfully',
  });
};

// export const logoutController = async (req, res) => {
//   if (req.cookies.sessionId) {
//     await logoutUser(req.cookies.sessionId);
//   }

//   res.clearCookie('sessionId');

//   res.status(200).send({ message: 'Logged out successfully' });
// };
