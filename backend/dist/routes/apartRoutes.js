"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apartController_1 = require("../controllers/apartController");
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
// for the assets / content
router.post("/upload-apartment-assets", multer_1.upload.array("files"), apartController_1.uploadApartmentAssets);
router.get("/get-all-apart-assets", apartController_1.getAllApartAssets);
router.post("/delete-asset", apartController_1.deleteAssets);
router.put("/set-on-homepage", apartController_1.setOnHompage);
router.put("/remove-from-hompage", apartController_1.removeFromHomepage);
// for the apartments
router.post("/create-apart", apartController_1.createNewApart);
router.get("/get-all-aparts", apartController_1.getAllAparts);
router.put("/update-apart/:id", apartController_1.updateApartment);
router.delete("/delete-apart/:id", apartController_1.deleteApartment);
router.post("/make-booking", multer_1.upload.single("receipt"), apartController_1.makeCustomerBooking);
router.get("/get-my-bookings/:customerId", apartController_1.GetAllCustomerBookings);
router.put("/cancel-booking/:bookingId", apartController_1.CancelMyBooking);
router.get("/get-all-bookings", apartController_1.GetAllAdminBookings);
router.put("/update-Booking-admin/:bookingId", multer_1.upload.single("receipt"), apartController_1.UpdateBookingAdmin);
router.get("/get-single-apart/:id", apartController_1.getSingleApart);
router.post("/add-new-apart-booking", apartController_1.AdminAddNewBooking);
router.delete("/delete-booking/:id", apartController_1.DeleteBooking);
exports.default = router;
