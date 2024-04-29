import express from "express";
import {
  deleteAssets,
  getAllApartAssets,
  removeFromHomepage,
  setOnHompage,
  updateApartment,
} from "../controllers/assetController";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.post("/update-apartment", upload.array("files"), updateApartment);

router.get("/get-all-apart-assets", getAllApartAssets);

router.post("/delete", deleteAssets);
router.put("/set-on-homepage", setOnHompage);
router.put("/remove-from-hompage", removeFromHomepage);

export default router;
