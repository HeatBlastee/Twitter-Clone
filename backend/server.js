import express, { urlencoded } from "express";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectMongoDB.js"
import userRoutes from "./routes/user.route.js";
import notificationRoutes from "./routes/notification.route.js";
import postRoutes from "./routes/post.route.js";
import cors from "cors"
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Ensure it matches frontend
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/posts",postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
