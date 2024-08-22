import app from "./app";
import dotenv from "dotenv";
import { env } from "./utils/validate";
import mongoose from "mongoose";
import colors from "colors";
import path from "path";
import express from "express";
import { createServer } from "http";
import https from "https";
import fs from "fs";
import { Server } from "socket.io";

// Load environment variables
dotenv.config();

const sslOptions = {
  key: fs.readFileSync(`/etc/letsencrypt/live/${env.SERVER_URL}/privkey.pem`),
  cert: fs.readFileSync(
    `/etc/letsencrypt/live/${env.SERVER_URL}/fullchain.pem`
  ),
  ca: fs.readFileSync(`/etc/letsencrypt/live/${env.SERVER_URL}/chain.pem`), // Optional, includes the chain of trust
};

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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = https.createServer(sslOptions, app);

mongoose
  .connect(env.MONGO_URL as string)
  .then(() => {
    console.log(colors.bgGreen("Connected to the database"));
    const port = env.PORT || 8000;
    server.listen(port, () => {
      console.log(colors.bgYellow(`THE APP IS RUNNING ON PORT ${port}`));
    });
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("Congrats App is working");
});
