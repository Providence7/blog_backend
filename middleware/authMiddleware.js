// authMiddleware.js
import  jwt from 'jsonwebtoken';

// Middleware to verify token and extract user data
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies (if stored there)

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret
    req.user = decoded; // Attach user data (decoded token) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Admin middleware to check for admin privileges
export const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

