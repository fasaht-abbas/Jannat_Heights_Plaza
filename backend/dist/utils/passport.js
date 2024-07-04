"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const validate_1 = require("./validate");
const userModel_1 = require("../models/userModel");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: validate_1.env.GOOGLE_CLIENT_ID,
    clientSecret: validate_1.env.GOOGLE_CLIENT_SECRET,
    callbackURL: validate_1.env.SERVER_URL + "/api/v1/auth/google/callback",
    scope: ["profile", "email"],
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, cb) => {
    try {
        const exsistingUser = (await userModel_1.UserModel.findOne({
            googleId: profile.id,
        }));
        if (exsistingUser) {
            return cb(null, exsistingUser);
        }
        const user = await userModel_1.UserModel.create({
            googleId: profile.id,
            email: profile?.emails?.[0]?.value,
            name: profile.displayName,
            profilePhoto: profile?.photos?.[0]?.value,
            verifiedEmail: true,
        });
        return cb(null, user);
    }
    catch (error) {
        if (error instanceof Error) {
            cb(error);
        }
        else {
            throw error;
        }
    }
}));
