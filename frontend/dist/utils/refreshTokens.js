"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshing = void 0;
const authSlice_1 = require("../redux/authSlice");
const store_1 = require("../redux/store");
const axios_1 = require("./axios");
const refreshing = async () => {
    const { data } = await axios_1.api.get("/api/v1/auth/refresh-tokens", {
        withCredentials: true,
    });
    if (data?.success) {
        store_1.store.dispatch((0, authSlice_1.login)({
            token: data?.accessToken,
            userData: {
                name: data?.returnUser?.name,
                _id: data?.returnUser?._id,
                email: data?.returnUser?.email,
                googleId: data?.returnUser?.googleId,
                role: data?.returnUser?.role,
                profilePhoto: data?.returnUser?.profilePhoto,
                address: data?.returnUser?.address,
                phone: data?.returnUser?.phone,
                CNIC: data?.returnUser?.CNIC,
                verifiedEmail: data?.returnUser?.verifiedEmail,
            },
        }));
    }
    else {
        throw new Error("Something went wrong");
    }
};
exports.refreshing = refreshing;
