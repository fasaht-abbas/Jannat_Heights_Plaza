import { RequestHandler, response } from "express";
import createHttpError from "http-errors";
import { AssetModel, Asset } from "../models/AssetModel";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import mongoose, { Mongoose } from "mongoose";
import { Apart, ApartModel } from "../models/ApartmentModel";
import { UserModel } from "../models/userModel";
import { Booking, BookingModel } from "../models/BookingModel";

export const uploadApartmentAssets: RequestHandler = async (req, res, next) => {
  try {
    if (!Array.isArray(req.files)) {
      throw createHttpError(400, "Something went wrong");
    }
    const uploadPromises = req.files.map(async (file) => {
      const response = await uploadOnCloudinary(file.path);
      const asset = {
        type: file.mimetype.startsWith("video/") ? "video" : "photo",
        link: response?.secure_url,
        for: "studio",
        cd_public_id: response?.public_id,
      };
      return asset;
    });

    const assets = await Promise.all(uploadPromises);
    await AssetModel.insertMany(assets);

    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// returning all the assets,

export const getAllApartAssets: RequestHandler = async (req, res, next) => {
  try {
    type ArrayAsset = Asset[];
    const allAssets: ArrayAsset = await AssetModel.find({ for: "studio" });
    const AllExceptHomepage: ArrayAsset = await allAssets.filter(
      (file) => file?.set_as_home_page !== "yes"
    );
    const homepage: ArrayAsset = await allAssets.filter(
      (file) => file?.set_as_home_page === "yes"
    );
    return res.status(200).send({
      success: true,
      AllExceptHomepage,
      homepage,
      allAssets,
    });
  } catch (error) {
    next(error);
  }
};

// dleteing the asset of the plaza

export const deleteAssets: RequestHandler = async (req, res, next) => {
  try {
    const toDelete = req.body;
    if (Array.isArray(toDelete)) {
      for (let i = 0; i < toDelete.length; i++) {
        const asset = await AssetModel.findById(toDelete[i]);

        if (asset) {
          await cloudinary.uploader.destroy(asset?.cd_public_id);
          await asset.deleteOne();
        }
      }
      return res.status(200).send({
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

// setting the asset on the hompage

export const setOnHompage: RequestHandler = async (req, res, next) => {
  try {
    const received = req.body.id;
    if (!received) {
      throw createHttpError(404, "Id not received");
    }
    const id = new mongoose.Types.ObjectId(received);
    const update = await AssetModel.findByIdAndUpdate(id, {
      set_as_home_page: "yes",
    });
    if (update) return res.status(200).send({ success: true });
    else {
      throw createHttpError(500, "failed updation");
    }
  } catch (error) {
    next(error);
  }
};

// removing from the homepage

export const removeFromHomepage: RequestHandler = async (req, res, next) => {
  try {
    const received = req.body.id;
    if (!received) {
      throw createHttpError(404, "Id not received");
    }
    const id = new mongoose.Types.ObjectId(received);
    const update = await AssetModel.findByIdAndUpdate(id, {
      set_as_home_page: "no",
    });
    if (update) {
      return res.status(200).send({
        success: true,
      });
    } else {
      throw createHttpError(500, "Updation failed");
    }
  } catch (error) {
    next(error);
  }
};

// adding a new apartment

export const createNewApart: RequestHandler = async (req, res, next) => {
  try {
    const { no, rent, floor } = req.body;
    if (!no || !rent || !floor) {
      throw createHttpError(404, "Something is missing ");
    }
    const existing = await ApartModel.findOne({ no: no });
    if (existing) {
      throw createHttpError(409, "Apartment already exists");
    }
    await ApartModel.create({
      floor: floor,
      no: no,
      rent: rent,
      status: "Available",
    });
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// returning all the exsisting aparts

export const getAllAparts: RequestHandler = async (req, res, next) => {
  try {
    type ArrayApart = Apart[];
    const allAparts: ArrayApart = await ApartModel.find({});
    return res.status(200).send({
      success: true,
      allAparts,
    });
  } catch (error) {
    next(error);
  }
};

// updating the apartment

export const updateApartment: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rent, no, floor, status } = req.body;
    if (id) {
      const realId = new mongoose.Types.ObjectId(id);
      const foundApart = await ApartModel.findById(realId);
      if (!foundApart) {
        throw createHttpError(404, "apartment not found");
      }
      await ApartModel.findByIdAndUpdate(realId, {
        rent: rent,
        no: no,
        floor: floor,
        status: status,
      });
      return res.status(200).send({
        success: true,
      });
    } else {
      throw createHttpError(404, "Id not found");
    }
  } catch (error) {
    next(error);
  }
};
// deleting apartment
export const deleteApartment: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const realId = new mongoose.Types.ObjectId(id);
    const found = await ApartModel.findById(realId);
    if (found) {
      await ApartModel.findByIdAndDelete(found);
      return res.status(200).send({
        success: true,
      });
    } else {
      throw createHttpError(400, "Apart not found");
    }
  } catch (error) {
    next(error);
  }
};
// makinga booking for customer
export const makeCustomerBooking: RequestHandler = async (req, res, next) => {
  try {
    const {
      customerId,
      apartment,
      amount,
      startDate,
      endDate,
      payment_meathod,
    } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const user = await UserModel.findById(
      new mongoose.Types.ObjectId(customerId)
    );
    const apart = await ApartModel.findById(
      new mongoose.Types.ObjectId(apartment)
    );
    console.log(user, apart);
    if (user && apart) {
      const newBooking = await BookingModel.create({
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
        const response = await uploadOnCloudinary(localPath);

        await BookingModel.findByIdAndUpdate(newBooking?._id, {
          payment_receipt: response?.secure_url,
        });
      }
      return res.status(200).send({
        success: true,
      });
    } else throw createHttpError(400, "Something is missing");
  } catch (error) {
    next(error);
  }
};

// Returning all the customer bookings
export const GetAllCustomerBookings: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { customerId } = req.params;
    const user = await UserModel.findById(
      new mongoose.Types.ObjectId(customerId)
    );
    if (user) {
      type arrayBookings = Booking[];
      const allBookings: arrayBookings = await BookingModel.find({
        customer: user?.id,
      })
        .populate("apartment")
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        allBookings,
      });
    } else {
      throw createHttpError(400, "Bookings not found");
    }
  } catch (error) {
    next(error);
  }
};

// Customer cancelling the booking

export const CancelMyBooking: RequestHandler = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const id = new mongoose.Types.ObjectId(bookingId);
    const booking = await BookingModel.findByIdAndUpdate(id, {
      status: "Canceled",
    });
    if (booking) {
      return res.status(200).send({
        success: true,
      });
    } else throw createHttpError(400, "Something went Wrong");
  } catch (error) {
    next(error);
  }
};
// returning each and every booking to the admin dashboard
export const GetAllAdminBookings: RequestHandler = async (req, res, next) => {
  try {
    type arrayBookings = Booking[];
    const allBookings: arrayBookings = await BookingModel.find({})
      .populate("apartment")
      .populate("customer")
      .sort({ createdAt: -1 });
    if (allBookings) {
      return res.status(200).send({
        success: true,
        allBookings,
      });
    } else throw createHttpError(400, "No booking found");
  } catch (error) {
    next(error);
  }
};

export const UpdateBookingAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { status, pStatus } = req.body;

    const { bookingId } = req.params;
    const bId = new mongoose.Types.ObjectId(bookingId);
    const Updated = await BookingModel.findByIdAndUpdate(bId, {
      status: status,
      payment_cleared: String(pStatus) === "true" ? true : false,
    });
    if (req.file) {
      const localPath = req.file?.path;
      const response = await uploadOnCloudinary(localPath);

      await BookingModel.findByIdAndUpdate(Updated?._id, {
        payment_receipt: response?.secure_url,
      });
    }
    if (Updated) {
      return res.status(200).send({
        success: true,
      });
    } else {
      throw createHttpError(400, "something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

/// returning a single apartment

export const getSingleApart: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundApart = (await ApartModel.findById(
      new mongoose.Types.ObjectId(id)
    )) as Apart;
    if (foundApart) {
      return res.status(200).send({
        success: true,
        foundApart,
      });
    } else {
      throw createHttpError(400, "Something Went Wrong");
    }
  } catch (error) {
    next(error);
  }
};
/// allowing the admin to make the booking

export const AdminAddNewBooking: RequestHandler = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      cnic,
      password,
      apartment,
      startDate,
      endDate,
      amount,

      pmeathod,
    } = req.body;
    const user = new UserModel({
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
    const booking = new BookingModel({
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
    } else {
      throw createHttpError(400, "Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

// for deleting a booking form admin side

export const DeleteBooking: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw createHttpError(400, "something went wrong");
    }
    await BookingModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
