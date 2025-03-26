import express from "express";
import User from "../models/users.model.js"; // Import the User model

const router = express.Router();

// Google login API
router.post("/google-login", async (req, res) => {
    try {
      const { googleId, email, username } = req.body;
  
      if (!googleId || !email || !username) {
        return res.status(400).json({ error: "Missing user data" });
      }
  
      // Check if user already exists
      let user = await User.findOne({ googleId });
  
      if (!user) {
        user = new User({ googleId, email, username });
        await user.save();
      }
  
      res.status(200).json({ message: "User authenticated", user });
    } catch (error) {
      console.error("❌ Google login error:", error.message);
      res.status(500).json({ error: "Server error", details: error.message });
    }
  });
  

export default router;
