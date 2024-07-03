import app from "./app";
import dotenv from "dotenv";
import { env } from "./utils/validate";
import mongoose from "mongoose";
import colors from "colors";

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

app.get("/", (req, res) => {
  res.send("Congrats App is working");
});
