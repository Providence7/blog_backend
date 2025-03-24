const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User'); // Assuming User model is in models/User.js

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, async (token, tokenSecret, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser); // If user exists, log them in
    }

    // If the user doesn't exist, create a new one
    const newUser = new User({
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      profilePicture: profile.photos[0].value,
    });
    await newUser.save();
    return done(null, newUser);
  } catch (err) {
    done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
