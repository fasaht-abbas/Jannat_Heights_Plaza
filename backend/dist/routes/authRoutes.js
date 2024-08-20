"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const passport_1 = __importDefault(require("passport"));
const validate_1 = require("../utils/validate");
const router = express_1.default.Router();
//for users registering with the email
router.post("/register-email", authControllers_1.registerWithEmail);
router.post("/get-user", authControllers_1.getAuthenticatedUser);
router.get("/google", passport_1.default.authenticate("google", { session: false }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: validate_1.env.FRONTEND_URL + "/login",
}), authControllers_1.AfterGoogleLogin);
router.post("/login-email", authControllers_1.LoginEmailController);
router.get("/refresh-tokens", authControllers_1.isUserLoggedIn, authControllers_1.refreshTokens);
router.get("/protected", authControllers_1.isUserLoggedIn);
router.post("/logout", authControllers_1.logoutController);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map