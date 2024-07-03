import app from "./app";
import dotenv from "dotenv";
import { env } from "./utils/validate";
import mongoose from "mongoose";
import colors from "colors";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

// Load environment variables
dotenv.config();

// Setting up REST
// Final deployment se pehlay ye colors wali sab chezain khatam kar dena.

mongoose
  .connect(env.MONGO_URL as string)
  .then(() => {
    console.log(colors.bgGreen("Connected to the database"));
    const port = env.PORT || 8000;
    app.listen(port, () => {
      console.log(colors.bgYellow(`THE APP IS RUNNING ON PORT ${port}`));
    });
  })
  .catch(console.error);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.get("/", (req, res) => {
  res.send("Congrats App is working");
});
