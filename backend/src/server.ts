import app from "./app";
import "dotenv/config";
import { env } from "./utils/validate";
import mongoose from "mongoose";
import colors from "colors";
// stting up REST
// final depolyment se pehlay ye colors wali sab chezain khatam kar dena.

mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    console.log(colors.bgGreen("conneted to the database"));
    const port = env.PORT || 8000;
    app.listen(port, () => {
      console.log(colors.bgYellow(`THE APP US RUNNING ON PORT ${port}`));
    });
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("Congrats App is working");
});
