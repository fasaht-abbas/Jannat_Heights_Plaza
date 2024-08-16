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
exports.DeleteBooking = exports.AdminAddNewBooking = exports.getSingleApart = exports.UpdateBookingAdmin = exports.GetAllAdminBookings = exports.CancelMyBooking = exports.GetAllCustomerBookings = exports.makeCustomerBooking = exports.deleteApartment = exports.updateApartment = exports.getAllAparts = exports.createNewApart = exports.removeFromHomepage = exports.setOnHompage = exports.deleteAssets = exports.getAllApartAssets = exports.uploadApartmentAssets = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const AssetModel_1 = require("../models/AssetModel");
const cloudinary_1 = require("../utils/cloudinary");
const cloudinary_2 = require("cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
const ApartmentModel_1 = require("../models/ApartmentModel");
const userModel_1 = require("../models/userModel");
const BookingModel_1 = require("../models/BookingModel");
const uploadApartmentAssets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!Array.isArray(req.files)) {
            throw (0, http_errors_1.default)(400, "Something went wrong");
        }
        const uploadPromises = req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, cloudinary_1.uploadOnCloudinary)(file.path);
            const asset = {
                type: file.mimetype.startsWith("video/") ? "video" : "photo",
                link: response === null || response === void 0 ? void 0 : response.secure_url,
                for: "studio",
                cd_public_id: response === null || response === void 0 ? void 0 : response.public_id,
            };
            return asset;
        }));
        const assets = yield Promise.all(uploadPromises);
        yield AssetModel_1.AssetModel.insertMany(assets);
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.uploadApartmentAssets = uploadApartmentAssets;
// returning all the assets,
const getAllApartAssets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAssets = yield AssetModel_1.AssetModel.find({ for: "studio" });
        const AllExceptHomepage = yield allAssets.filter((file) => (file === null || file === void 0 ? void 0 : file.set_as_home_page) !== "yes");
        const homepage = yield allAssets.filter((file) => (file === null || file === void 0 ? void 0 : file.set_as_home_page) === "yes");
        return res.status(200).send({
            success: true,
            AllExceptHomepage,
            homepage,
            allAssets,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllApartAssets = getAllApartAssets;
// dleteing the asset of the plaza
const deleteAssets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDelete = req.body;
        if (Array.isArray(toDelete)) {
            for (let i = 0; i < toDelete.length; i++) {
                const asset = yield AssetModel_1.AssetModel.findById(toDelete[i]);
                if (asset) {
                    yield cloudinary_2.v2.uploader.destroy(asset === null || asset === void 0 ? void 0 : asset.cd_public_id);
                    yield asset.deleteOne();
                }
            }
            return res.status(200).send({
                success: true,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAssets = deleteAssets;
// setting the asset on the hompage
const setOnHompage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const received = req.body.id;
        if (!received) {
            throw (0, http_errors_1.default)(404, "Id not received");
        }
        const id = new mongoose_1.default.Types.ObjectId(received);
        const update = yield AssetModel_1.AssetModel.findByIdAndUpdate(id, {
            set_as_home_page: "yes",
        });
        if (update)
            return res.status(200).send({ success: true });
        else {
            throw (0, http_errors_1.default)(500, "failed updation");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.setOnHompage = setOnHompage;
// removing from the homepage
const removeFromHomepage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const received = req.body.id;
        if (!received) {
            throw (0, http_errors_1.default)(404, "Id not received");
        }
        const id = new mongoose_1.default.Types.ObjectId(received);
        const update = yield AssetModel_1.AssetModel.findByIdAndUpdate(id, {
            set_as_home_page: "no",
        });
        if (update) {
            return res.status(200).send({
                success: true,
            });
        }
        else {
            throw (0, http_errors_1.default)(500, "Updation failed");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.removeFromHomepage = removeFromHomepage;
// adding a new apartment
const createNewApart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, rent, floor } = req.body;
        if (!no || !rent || !floor) {
            throw (0, http_errors_1.default)(404, "Something is missing ");
        }
        const existing = yield ApartmentModel_1.ApartModel.findOne({ no: no });
        if (existing) {
            throw (0, http_errors_1.default)(409, "Apartment already exists");
        }
        yield ApartmentModel_1.ApartModel.create({
            floor: floor,
            no: no,
            rent: rent,
            status: "Available",
        });
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createNewApart = createNewApart;
// returning all the exsisting aparts
const getAllAparts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAparts = yield ApartmentModel_1.ApartModel.find({});
        return res.status(200).send({
            success: true,
            allAparts,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAparts = getAllAparts;
// updating the apartment
const updateApartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rent, no, floor, status } = req.body;
        if (id) {
            const realId = new mongoose_1.default.Types.ObjectId(id);
            const foundApart = yield ApartmentModel_1.ApartModel.findById(realId);
            if (!foundApart) {
                throw (0, http_errors_1.default)(404, "apartment not found");
            }
            yield ApartmentModel_1.ApartModel.findByIdAndUpdate(realId, {
                rent: rent,
                no: no,
                floor: floor,
                status: status,
            });
            return res.status(200).send({
                success: true,
            });
        }
        else {
            throw (0, http_errors_1.default)(404, "Id not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateApartment = updateApartment;
// deleting apartment
const deleteApartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const realId = new mongoose_1.default.Types.ObjectId(id);
        const found = yield ApartmentModel_1.ApartModel.findById(realId);
        if (found) {
            yield ApartmentModel_1.ApartModel.findByIdAndDelete(found);
            return res.status(200).send({
                success: true,
            });
        }
        else {
            throw (0, http_errors_1.default)(400, "Apart not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteApartment = deleteApartment;
// makinga booking for customer
const makeCustomerBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { customerId, apartment, amount, startDate, endDate, payment_meathod, } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const user = yield userModel_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(customerId));
        const apart = yield ApartmentModel_1.ApartModel.findById(new mongoose_1.default.Types.ObjectId(apartment));
        console.log(user, apart);
        if (user && apart) {
            const newBooking = yield BookingModel_1.BookingModel.create({
                from: start,
                to: end,
                customer: user,
                apartment: apart,
                status: "Processing",
                payment_meathod: payment_meathod,
                payment_cleared: false,
                payment_amount: Number(amount),
                booking_time: new Date(),
            });
            if (req.file) {
                const localPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                const response = yield (0, cloudinary_1.uploadOnCloudinary)(localPath);
                yield BookingModel_1.BookingModel.findByIdAndUpdate(newBooking === null || newBooking === void 0 ? void 0 : newBooking._id, {
                    payment_receipt: response === null || response === void 0 ? void 0 : response.secure_url,
                });
            }
            return res.status(200).send({
                success: true,
            });
        }
        else
            throw (0, http_errors_1.default)(400, "Something is missing");
    }
    catch (error) {
        next(error);
    }
});
exports.makeCustomerBooking = makeCustomerBooking;
// Returning all the customer bookings
const GetAllCustomerBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const user = yield userModel_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(customerId));
        if (user) {
            const allBookings = yield BookingModel_1.BookingModel.find({
                customer: user === null || user === void 0 ? void 0 : user.id,
            })
                .populate("apartment")
                .sort({ createdAt: -1 });
            return res.status(200).send({
                success: true,
                allBookings,
            });
        }
        else {
            throw (0, http_errors_1.default)(400, "Bookings not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.GetAllCustomerBookings = GetAllCustomerBookings;
// Customer cancelling the booking
const CancelMyBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingId } = req.params;
        const id = new mongoose_1.default.Types.ObjectId(bookingId);
        const booking = yield BookingModel_1.BookingModel.findByIdAndUpdate(id, {
            status: "Canceled",
        });
        if (booking) {
            return res.status(200).send({
                success: true,
            });
        }
        else
            throw (0, http_errors_1.default)(400, "Something went Wrong");
    }
    catch (error) {
        next(error);
    }
});
exports.CancelMyBooking = CancelMyBooking;
// returning each and every booking to the admin dashboard
const GetAllAdminBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield BookingModel_1.BookingModel.find({})
            .populate("apartment")
            .populate("customer")
            .sort({ createdAt: -1 });
        if (allBookings) {
            return res.status(200).send({
                success: true,
                allBookings,
            });
        }
        else
            throw (0, http_errors_1.default)(400, "No booking found");
    }
    catch (error) {
        next(error);
    }
});
exports.GetAllAdminBookings = GetAllAdminBookings;
const UpdateBookingAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { status, pStatus } = req.body;
        const { bookingId } = req.params;
        const bId = new mongoose_1.default.Types.ObjectId(bookingId);
        const Updated = yield BookingModel_1.BookingModel.findByIdAndUpdate(bId, {
            status: status,
            payment_cleared: String(pStatus) === "true" ? true : false,
        });
        if (req.file) {
            const localPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const response = yield (0, cloudinary_1.uploadOnCloudinary)(localPath);
            yield BookingModel_1.BookingModel.findByIdAndUpdate(Updated === null || Updated === void 0 ? void 0 : Updated._id, {
                payment_receipt: response === null || response === void 0 ? void 0 : response.secure_url,
            });
        }
        if (Updated) {
            return res.status(200).send({
                success: true,
            });
        }
        else {
            throw (0, http_errors_1.default)(400, "something went wrong");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateBookingAdmin = UpdateBookingAdmin;
/// returning a single apartment
const getSingleApart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const foundApart = (yield ApartmentModel_1.ApartModel.findById(new mongoose_1.default.Types.ObjectId(id)));
        if (foundApart) {
            return res.status(200).send({
                success: true,
                foundApart,
            });
        }
        else {
            throw (0, http_errors_1.default)(400, "Something Went Wrong");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleApart = getSingleApart;
/// allowing the admin to make the booking
const AdminAddNewBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, address, cnic, password, apartment, startDate, endDate, amount, pmeathod, } = req.body;
        console.log(amount);
        // Check if a user with the provided CNIC already exists
        let user = yield userModel_1.UserModel.findOne({ CNIC: cnic });
        if (!user) {
            // If user does not exist, create a new user
            user = new userModel_1.UserModel({
                name,
                email,
                phone,
                address,
                CNIC: cnic,
                password,
            });
            yield user.save(); // Save the new user to the database
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Create the booking
        const booking = new BookingModel_1.BookingModel({
            apartment,
            customer: user._id,
            from: start,
            to: end,
            payment_meathod: pmeathod,
            payment_cleared: false,
            payment_amount: Number(amount),
            status: "Processing",
            booking_time: new Date(),
        });
        yield booking.save(); // Save the booking to the database
        return res.status(200).send({
            success: true,
            message: "Booking created successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AdminAddNewBooking = AdminAddNewBooking;
// for deleting a booking form admin side
const DeleteBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            throw (0, http_errors_1.default)(400, "something went wrong");
        }
        yield BookingModel_1.BookingModel.findByIdAndDelete(new mongoose_1.default.Types.ObjectId(id));
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteBooking = DeleteBooking;
//# sourceMappingURL=apartController.js.map