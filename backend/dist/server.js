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
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
// Load environment variables
dotenv_1.default.config();
app_1.default.use(express_1.default.static(path_1.default.join(__dirname, "build"), {
    setHeaders: (res, path) => {
        if (path.endsWith(".css")) {
            res.setHeader("Content-Type", "text/css");
        }
        else if (path.endsWith(".js")) {
            res.setHeader("Content-Type", "application/javascript");
        }
    },
}));
app_1.default.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "build", "index.html"));
});
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
//# sourceMappingURL=server.js.map