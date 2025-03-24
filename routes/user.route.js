import  express from 'express';
import passport from 'passport';
const router = express.Router();
// Google OAuth routes

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirect after successful login
    res.redirect("https://myfashion-b8i1.onrender.com"); // ✅ Redirect to your frontend
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send('Logout failed');
    res.redirect('/');
  });
});

// Route to get the profile data
router.get('/profile', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  res.json(req.user);
});

export default router;
