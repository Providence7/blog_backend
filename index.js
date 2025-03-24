import express from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import  User from './models/users.model.js'; // Assuming User model is in models/User.js
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import newsRouter from './routes/news.js'
import commentRouter from "./routes/comment.route.js";
import passport from "passport"
import  session from "express-session";
import cors from "cors";
import cookieParser from'cookie-parser';
import dotenv from "dotenv"
dotenv.config()
const app = express();


app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "https://myfashion-b8i1.onrender.com", // Frontend URL
  methods: "GET, POST, PUT, DELETE",
  credentials: true, // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));
app.use(
  session({
    secret: "your_secret_key", // Change this to a secure random string
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Secure should be true in production (HTTPS)
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://myfashion-b8i1.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res)=>{
  res.status(200).json({message : "server is live"})
})
app.use("/newsletter", newsRouter);
app.use("/auth", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something is wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running!");
});