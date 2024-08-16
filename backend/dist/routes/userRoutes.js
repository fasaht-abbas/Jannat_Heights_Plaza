"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.post("/find-user", userController_1.findUser);
router.post("/send-otp", userController_1.sendOTP);
router.post("/verify-otp", userController_1.verifyOTP);
router.put("/update-password", userController_1.updatePassword);
router.get("/get-all-users", userController_1.getAllUsers);
router.put("/update-user-role/:uid", userController_1.UpdateUserRole);
router.post("/update-user", multer_1.upload.single("photo"), userController_1.updateProfile);
router.post("/send-contact-mail", userController_1.ContactUsMail);
router.get("/search/:query", userController_1.search);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map