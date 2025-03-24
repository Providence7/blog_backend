// authMiddleware.js
import  jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // 👈 Get token from cookies

    if (!token) {
      return res.status(403).json({ message: "Not logged in" });
    }

    // Verify the Google OAuth token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.user = payload; // 👈 Add user data to `req`

    next(); // ✅ Proceed to the next middleware
  } catch (error) {
    console.error("Google Token Verification Failed:", error);
    return res.status(403).json({ message: "Invalid session" });
  }
};
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

