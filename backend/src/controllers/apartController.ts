import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { AssetModel, Asset } from "../models/AssetModel";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { Apart, ApartModel } from "../models/ApartmentModel";

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
    const { rent, no, floor } = req.body;
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
