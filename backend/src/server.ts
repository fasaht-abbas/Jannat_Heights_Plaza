import app from "./app";
import dotenv from "dotenv";
import { env } from "./utils/validate";
import mongoose from "mongoose";
import colors from "colors";
import path from "path";
import express from "express";

// Load environment variables
dotenv.config();

app.use(
  express.static(path.join(__dirname, "build"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
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

app.get("/", (req, res) => {
  res.send("Congrats App is working");
});
