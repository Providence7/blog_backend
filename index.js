import express from "express";
import connectDB from "./lib/connectDB.js";
// import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
// import commentRouter from "./routes/comment.route.js";
// import webhookRouter from "./routes/webhook.route.js";
// import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()
const app = express();

// app.use(cors({
//   origin: ["https://fashionera.onrender.com"], // Only allow this frontend
//   credentials: true, // Allow cookies if needed
// }));
// app.use(clerkMiddleware());
// app.use("/webhooks", webhookRouter);
app.use(express.json());

app.use(cors({
  origin: { origin: "*" },  // ✅ Only allow frontend
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.get('/', (req, res)=>{
  res.status(200).json({message : "server is live"})
})

// app.get("/test",(req,res)=>{
//   res.status(200).send("it works!")
// })

// app.get("/auth-state", (req, res) => {
//   const authState = req.auth;
//   res.json(authState);
// });

// app.get("/protect", (req, res) => {
//   const {userId} = req.auth;
//   if(!userId){
//     return res.status(401).json("not authenticated")
//   }
//   res.status(200).json("content")
// });

// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("content")
// });

// app.use("/users", userRouter);
app.use("/posts", postRouter);
// app.use("/comments", commentRouter);

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