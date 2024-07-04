"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const validate_1 = require("./utils/validate");
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
// Load environment variables
dotenv_1.default.config();
// Setting up REST
// Final deployment se pehlay ye colors wali sab chezain khatam kar dena.
mongoose_1.default
    .connect(validate_1.env.MONGO_URL)
    .then(() => {
    console.log(colors_1.default.bgGreen("Connected to the database"));
    const port = validate_1.env.PORT || 8000;
    app_1.default.listen(port, () => {
        console.log(colors_1.default.bgYellow(`THE APP IS RUNNING ON PORT ${port}`));
    });
})
    .catch(console.error);
app_1.default.get("/", (req, res) => {
    res.send("Congrats App is working");
});
