import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errorMessages = err.details.map((d) => d.message).join(', ');
    const error = createHttpError(400, `Bad Request: ${errorMessages}`, {
      errors: err.details,
    });
    next(error);
  }
};
