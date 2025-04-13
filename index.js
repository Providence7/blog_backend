import express from "express";
import connectDB from "./lib/connectDB.js";
import postRouter from "./routes/post.route.js";
import newsRouter from './routes/news.js'
import cors from "cors";
import commentRoutes from "./routes/comment.route.js"
import cookieParser from'cookie-parser'
import authRoute from "./routes/user.route.js"; 
import adminRoutes from "./routes/admin.route.js";
import topicRoutes from "./routes/topic.route.js"


import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL1, // Frontend URL
  methods: "GET, POST, PUT, DELETE",
  credentials: true, // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));

app.use("/newsletter", newsRouter);
app.use("/posts", postRouter);
app.use("/api", commentRoutes);
app.use("/api/auth", authRoute); 
app.use("/api/admin", adminRoutes);
app.use("/api/topics", topicRoutes); // Route for topics


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