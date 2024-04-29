import express from "express";
import {
  sendOTP,
  updateProfile,
  verifyOTP,
  updatePassword,
  findUser,
} from "../controllers/userController";
import { upload } from "../middlewares/multer";
const router = express.Router();

router.post("/find-user", findUser);

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

router.post("/update-user", upload.single("photo"), updateProfile);
router.put("/update-password", updatePassword);
export default router;
