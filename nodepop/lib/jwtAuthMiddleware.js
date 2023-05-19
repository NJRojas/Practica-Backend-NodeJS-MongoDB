const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Middleware module for authentication
module.exports = async (req, res, next) => {
  try {
    // Retrieve JWToken from header / body / query string
    const jwtToken = req.get('Authorization') || req.body.jwt || req.query.jwt;

    // Throws error if JWToken was not found
    if (!jwtToken) {
      const error = createError(401, 'Unauthorized. no token provided');
      next(error);
      return;
    }

    // Verify JWToken validity
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.APILoggeduser = payload._id;

    next();
  } catch (err) {
    if (err.message === 'invalid signature') {
      next(createError(401, 'invalid token'));
      return;
    }
    next(err);
  }
};
