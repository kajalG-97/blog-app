import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import likeRouter from "./routes/likeRoutes.js";
import { authorizationMiddleware } from "./middleware/autharization.js";

const app = express();
dotenv.config();

const port = 4532;

app.use(cors());

app.use(express.json());

app.use("/", authRouter);
app.use("/posts", authorizationMiddleware, postRouter);
app.use("/posts/:postId/comments", authorizationMiddleware, commentRouter);
app.use("/likes", authorizationMiddleware, likeRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log("failed to connect mongoDB", error));
