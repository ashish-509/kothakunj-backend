import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const { statusCode, message, errors } = err;
    res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  } else {
    console.error(`Unexpected Error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
