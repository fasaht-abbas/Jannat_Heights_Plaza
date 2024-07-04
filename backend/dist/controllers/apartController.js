"use strict";
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
const uploadApartmentAssets = async (req, res, next) => {
    try {
        if (!Array.isArray(req.files)) {
            throw (0, http_errors_1.default)(400, "Something went wrong");
        }
        const uploadPromises = req.files.map(async (file) => {
            const response = await (0, cloudinary_1.uploadOnCloudinary)(file.path);
            const asset = {
                type: file.mimetype.startsWith("video/") ? "video" : "photo",
                link: response?.secure_url,
                for: "studio",
                cd_public_id: response?.public_id,
            };
            return asset;
        });
        const assets = await Promise.all(uploadPromises);
        await AssetModel_1.AssetModel.insertMany(assets);
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadApartmentAssets = uploadApartmentAssets;
// returning all the assets,
const getAllApartAssets = async (req, res, next) => {
    try {
        const allAssets = await AssetModel_1.AssetModel.find({ for: "studio" });
        const AllExceptHomepage = await allAssets.filter((file) => file?.set_as_home_page !== "yes");
        const homepage = await allAssets.filter((file) => file?.set_as_home_page === "yes");
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
};
exports.getAllApartAssets = getAllApartAssets;
// dleteing the asset of the plaza
const deleteAssets = async (req, res, next) => {
    try {
        const toDelete = req.body;
        if (Array.isArray(toDelete)) {
            for (let i = 0; i < toDelete.length; i++) {
                const asset = await AssetModel_1.AssetModel.findById(toDelete[i]);
                if (asset) {
                    await cloudinary_2.v2.uploader.destroy(asset?.cd_public_id);
                    await asset.deleteOne();
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
};
exports.deleteAssets = deleteAssets;
// setting the asset on the hompage
const setOnHompage = async (req, res, next) => {
    try {
        const received = req.body.id;
        if (!received) {
            throw (0, http_errors_1.default)(404, "Id not received");
        }
        const id = new mongoose_1.default.Types.ObjectId(received);
        const update = await AssetModel_1.AssetModel.findByIdAndUpdate(id, {
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
};
exports.setOnHompage = setOnHompage;
// removing from the homepage
const removeFromHomepage = async (req, res, next) => {
    try {
        const received = req.body.id;
        if (!received) {
            throw (0, http_errors_1.default)(404, "Id not received");
        }
        const id = new mongoose_1.default.Types.ObjectId(received);
        const update = await AssetModel_1.AssetModel.findByIdAndUpdate(id, {
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
};
exports.removeFromHomepage = removeFromHomepage;
// adding a new apartment
const createNewApart = async (req, res, next) => {
    try {
        const { no, rent, floor } = req.body;
        if (!no || !rent || !floor) {
            throw (0, http_errors_1.default)(404, "Something is missing ");
        }
        const existing = await ApartmentModel_1.ApartModel.findOne({ no: no });
        if (existing) {
            throw (0, http_errors_1.default)(409, "Apartment already exists");
        }
        await ApartmentModel_1.ApartModel.create({
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
};
exports.createNewApart = createNewApart;
// returning all the exsisting aparts
const getAllAparts = async (req, res, next) => {
    try {
        const allAparts = await ApartmentModel_1.ApartModel.find({});
        return res.status(200).send({
            success: true,
            allAparts,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllAparts = getAllAparts;
// updating the apartment
const updateApartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rent, no, floor, status } = req.body;
        if (id) {
            const realId = new mongoose_1.default.Types.ObjectId(id);
            const foundApart = await ApartmentModel_1.ApartModel.findById(realId);
            if (!foundApart) {
                throw (0, http_errors_1.default)(404, "apartment not found");
            }
            await ApartmentModel_1.ApartModel.findByIdAndUpdate(realId, {
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
};
exports.updateApartment = updateApartment;
// deleting apartment
const deleteApartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const realId = new mongoose_1.default.Types.ObjectId(id);
        const found = await ApartmentModel_1.ApartModel.findById(realId);
        if (found) {
            await ApartmentModel_1.ApartModel.findByIdAndDelete(found);
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
};
exports.deleteApartment = deleteApartment;
// makinga booking for customer
const makeCustomerBooking = async (req, res, next) => {
    try {
        const { customerId, apartment, amount, startDate, endDate, payment_meathod, } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const user = await userModel_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(customerId));
        const apart = await ApartmentModel_1.ApartModel.findById(new mongoose_1.default.Types.ObjectId(apartment));
        console.log(user, apart);
        if (user && apart) {
            const newBooking = await BookingModel_1.BookingModel.create({
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
                const localPath = req.file?.path;
                const response = await (0, cloudinary_1.uploadOnCloudinary)(localPath);
                await BookingModel_1.BookingModel.findByIdAndUpdate(newBooking?._id, {
                    payment_receipt: response?.secure_url,
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
};
exports.makeCustomerBooking = makeCustomerBooking;
// Returning all the customer bookings
const GetAllCustomerBookings = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const user = await userModel_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(customerId));
        if (user) {
            const allBookings = await BookingModel_1.BookingModel.find({
                customer: user?.id,
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
};
exports.GetAllCustomerBookings = GetAllCustomerBookings;
// Customer cancelling the booking
const CancelMyBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const id = new mongoose_1.default.Types.ObjectId(bookingId);
        const booking = await BookingModel_1.BookingModel.findByIdAndUpdate(id, {
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
};
exports.CancelMyBooking = CancelMyBooking;
// returning each and every booking to the admin dashboard
const GetAllAdminBookings = async (req, res, next) => {
    try {
        const allBookings = await BookingModel_1.BookingModel.find({})
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
};
exports.GetAllAdminBookings = GetAllAdminBookings;
const UpdateBookingAdmin = async (req, res, next) => {
    try {
        const { status, pStatus } = req.body;
        const { bookingId } = req.params;
        const bId = new mongoose_1.default.Types.ObjectId(bookingId);
        const Updated = await BookingModel_1.BookingModel.findByIdAndUpdate(bId, {
            status: status,
            payment_cleared: String(pStatus) === "true" ? true : false,
        });
        if (req.file) {
            const localPath = req.file?.path;
            const response = await (0, cloudinary_1.uploadOnCloudinary)(localPath);
            await BookingModel_1.BookingModel.findByIdAndUpdate(Updated?._id, {
                payment_receipt: response?.secure_url,
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
};
exports.UpdateBookingAdmin = UpdateBookingAdmin;
/// returning a single apartment
const getSingleApart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundApart = (await ApartmentModel_1.ApartModel.findById(new mongoose_1.default.Types.ObjectId(id)));
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
};
exports.getSingleApart = getSingleApart;
/// allowing the admin to make the booking
const AdminAddNewBooking = async (req, res, next) => {
    try {
        const { name, email, phone, address, cnic, password, apartment, startDate, endDate, amount, pmeathod, } = req.body;
        const user = new userModel_1.UserModel({
            name: name,
            email: email,
            phone: phone,
            address: address,
            CNIC: cnic,
            password: password,
        });
        user.save();
        const start = new Date(startDate);
        const end = new Date(endDate);
        const booking = new BookingModel_1.BookingModel({
            apartment: apartment,
            customer: user?._id,
            from: start,
            to: end,
            payment_meathod: pmeathod,
            payment_cleared: false,
            payment_amount: Number(amount),
            status: "Processing",
            booking_time: new Date(),
        });
        booking.save();
        if (booking) {
            return res.status(200).send({
                success: true,
            });
        }
        else {
            throw (0, http_errors_1.default)(400, "Something went wrong");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.AdminAddNewBooking = AdminAddNewBooking;
// for deleting a booking form admin side
const DeleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw (0, http_errors_1.default)(400, "something went wrong");
        }
        await BookingModel_1.BookingModel.findByIdAndDelete(new mongoose_1.default.Types.ObjectId(id));
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.DeleteBooking = DeleteBooking;
