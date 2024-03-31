import express from "express";
import {
  AfterGoogleLogin,
  getAuthenticatedUser,
  registerWithEmail,
  LoginEmailController,
  refreshTokens,
  isUserLoggedIn,
  logoutController,
} from "../controllers/authControllers";

import passport from "passport";
import { env } from "../utils/validate";

const router = express.Router();
//for users registering with the email
router.post("/register-email", registerWithEmail);

router.post("/get-user", getAuthenticatedUser);

router.post("/login-email");

router.get("/google", passport.authenticate("google", { session: false }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: env.FRONTEND_URL + "/login",
  }),
  AfterGoogleLogin
);

router.post("/login-email", LoginEmailController);

router.get("/refresh-tokens", refreshTokens);

router.get("/protected", isUserLoggedIn);

router.post("/logout", logoutController);

export default router;
