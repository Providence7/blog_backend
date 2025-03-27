import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import Comment from "../models/comments.model.js";
import Post from "../models/posts.model.js";
import User from "../models/users.model.js";


const maxAdmins = 3; // Allow up to 3 admins

// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if admin limit is reached
    const adminCount = await Admin.countDocuments();
    if (adminCount >= maxAdmins) {
      return res.status(403).json({ message: "Admin limit reached" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, adminId: admin._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalComments = await Comment.countDocuments();

    console.log("Stats fetched:", { totalUsers, totalPosts, totalComments });

    res.json({ 
      success: true, 
      data: { totalUsers, totalPosts, totalComments } 
    });

  } catch (error) {
    console.error("Dashboard Stats Error ❌:", error.message);

    res.status(500).json({ 
      success: false, 
      message: "Error fetching dashboard stats",
      error: error.message
    });
  }
};
export const userDash = async (req,res) => {
  try {
    const users = await User.find({}, "username email"); // Fetch only name & email
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }

} 
export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed", details: error.message });
  }
};
