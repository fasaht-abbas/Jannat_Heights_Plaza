import app from "./app";
import dotenv from "dotenv";
import { env } from "./utils/validate";
import mongoose from "mongoose";
import colors from "colors";
import path from "path";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// Setting up REST
// Final deployment se pehlay ye colors wali sab chezain khatam kar dena.

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.FRONTEND_URL, // Adjust for your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log("A user connected" + socket.id);

  socket.on("disconnect", async () => {
    console.log("a user disconnected", socket.id);
  });
});
// Listen for incoming socket connections

// Example: Emit an event when a booking is made
const notifyAdminBooking = (bookingData: any) => {
  io.emit("newBooking", bookingData);
};

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
