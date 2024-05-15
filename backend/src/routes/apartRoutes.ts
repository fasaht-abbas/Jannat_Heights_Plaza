import express from "express";
import {
  createNewApart,
  deleteAssets,
  getAllApartAssets,
  getAllAparts,
  removeFromHomepage,
  setOnHompage,
  updateApartment,
  uploadApartmentAssets,
} from "../controllers/apartController";
import { upload } from "../middlewares/multer";

const router = express.Router();
// for the assets / content
router.post(
  "/upload-apartment-assets",
  upload.array("files"),
  uploadApartmentAssets
);
router.get("/get-all-apart-assets", getAllApartAssets);
router.post("/delete-asset", deleteAssets);
router.put("/set-on-homepage", setOnHompage);
router.put("/remove-from-hompage", removeFromHomepage);
// for the apartments
router.post("/create-apart", createNewApart);
router.get("/get-all-aparts", getAllAparts);
router.put("/update-apart/:id", updateApartment);
export default router;
