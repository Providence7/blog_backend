import  User from '../models/users.model';

// Get profile data for authenticated user
export const getProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User is not authenticated' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update profile data for authenticated user (optional)
export const updateProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User is not authenticated' });
  }

  const { username, email, profilePicture } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePicture = profilePicture || user.profilePicture;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
