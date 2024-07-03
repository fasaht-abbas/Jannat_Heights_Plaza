import express from "express";
import {
  AdminAddNewBooking,
  CancelMyBooking,
  DeleteBooking,
  GetAllAdminBookings,
  GetAllCustomerBookings,
  UpdateBookingAdmin,
  createNewApart,
  deleteApartment,
  deleteAssets,
  getAllApartAssets,
  getAllAparts,
  getSingleApart,
  makeCustomerBooking,
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
router.delete("/delete-apart/:id", deleteApartment);
router.post("/make-booking", upload.single("receipt"), makeCustomerBooking);
router.get("/get-my-bookings/:customerId", GetAllCustomerBookings);
router.put("/cancel-booking/:bookingId", CancelMyBooking);
router.get("/get-all-bookings", GetAllAdminBookings);
router.put(
  "/update-Booking-admin/:bookingId",
  upload.single("receipt"),
  UpdateBookingAdmin
);
router.get("/get-single-apart/:id", getSingleApart);
router.post("/add-new-apart-booking", AdminAddNewBooking);
router.delete("/delete-booking/:id", DeleteBooking);

export default router;
