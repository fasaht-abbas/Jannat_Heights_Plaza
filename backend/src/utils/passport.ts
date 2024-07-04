import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "./validate";
import bcrypt from "bcrypt";
import { User, UserModel } from "../models/userModel";
import UserDTO from "../types/userType";
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.SERVER_URL + "/api/v1/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        const exsistingUser: UserDTO = (await UserModel.findOne({
          googleId: profile.id,
        })) as UserDTO;

        if (exsistingUser) {
          return cb(null, exsistingUser);
        }
        const user = await UserModel.create({
          googleId: profile.id,
          email: profile?.emails?.[0]?.value,
          name: profile.displayName,
          profilePhoto: profile?.photos?.[0]?.value,
          verifiedEmail: true,
        });
        return cb(null, user);
      } catch (error) {
        if (error instanceof Error) {
          cb(error);
        } else {
          throw error;
        }
      }
    }
  )
);
