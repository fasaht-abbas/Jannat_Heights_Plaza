import express from "express";
import {
  sendOTP,
  updateProfile,
  verifyOTP,
  updatePassword,
  findUser,
  getAllUsers,
  UpdateUserRole,
  ContactUsMail,
  search,
} from "../controllers/userController";
import { upload } from "../middlewares/multer";
const router = express.Router();

router.post("/find-user", findUser);

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);
router.put("/update-password", updatePassword);

router.get("/get-all-users", getAllUsers);
router.put("/update-user-role/:uid", UpdateUserRole);
router.post("/update-user", upload.single("photo"), updateProfile);
router.post("/send-contact-mail", ContactUsMail);

router.get("/search/:query", search);

export default router;
