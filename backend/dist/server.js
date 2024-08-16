"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const http_1 = require("http");
const socket_io_1 = require("socket.io");
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
const server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: validate_1.env.FRONTEND_URL, // Adjust for your frontend URL
        methods: ["GET", "POST"],
    },
});
io.on("connect", (socket) => {
    console.log("A user connected" + socket.id);
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("a user disconnected", socket.id);
    }));
});
// Listen for incoming socket connections
// Example: Emit an event when a booking is made
const notifyAdminBooking = (bookingData) => {
    io.emit("newBooking", bookingData);
};
mongoose_1.default
    .connect(validate_1.env.MONGO_URL)
    .then(() => {
    console.log(colors_1.default.bgGreen("Connected to the database"));
    const port = validate_1.env.PORT || 8000;
    server.listen(port, () => {
        console.log(colors_1.default.bgYellow(`THE APP IS RUNNING ON PORT ${port}`));
    });
})
    .catch(console.error);
app_1.default.get("/", (req, res) => {
    res.send("Congrats App is working");
});
//# sourceMappingURL=server.js.map