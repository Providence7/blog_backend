import express from "express";
import Users from "../models/users.model.js"; // Import the User model

const router = express.Router();

// Google login API
router.post("/user", async (req, res) => {
  const { googleId, email, username } = req.body;

  if (!googleId || !email || !username) {
    return res.status(400).json({ message: "Missing required user data" });
  }

  try {
    // Check if user already exists
    let user = await Users.findOne({ googleId });

    if (!user) {
      // Create new user
      user = new Users({ googleId, email, username });
      await user.save();
    }

    res.status(200).json({ message: "User logged in", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
  

export default router;
