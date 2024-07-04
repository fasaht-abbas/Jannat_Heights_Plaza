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
}, (req, accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const exsistingUser = (yield userModel_1.UserModel.findOne({
            googleId: profile.id,
        }));
        if (exsistingUser) {
            return cb(null, exsistingUser);
        }
        const user = yield userModel_1.UserModel.create({
            googleId: profile.id,
            email: (_b = (_a = profile === null || profile === void 0 ? void 0 : profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value,
            name: profile.displayName,
            profilePhoto: (_d = (_c = profile === null || profile === void 0 ? void 0 : profile.photos) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value,
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
})));
//# sourceMappingURL=passport.js.map