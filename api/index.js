import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

const port = 4000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.use("/auth", authRoute);

app.get("/test", (req, res) => {
  res.json("Hello World Test!");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  res.json({ name, email, password });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
