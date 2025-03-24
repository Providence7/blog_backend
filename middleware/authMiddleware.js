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
