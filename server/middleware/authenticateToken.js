const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error('Authorization header missing');
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Token missing from authorization header');
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Set user info in req
    next();
  });
};

module.exports = authenticateToken;
