"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bookingSchema = new mongoose_1.Schema({
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    booking_time: {
        type: Date,
        required: true,
    },
    // this iss not the final model feel free to modify it kion k ama ne tv chalaya hua hai
    status: {
        type: String,
        enum: ["Processing", "Confirmed", "Expired", "Canceled"],
        default: "Processing",
    },
    payment_meathod: {
        type: String,
        enum: ["advance", "on_check_in"],
    },
    payment_cleared: {
        type: Boolean,
        required: true,
        default: false,
    },
    payment_amount: {
        type: Number,
    },
    payment_receipt: {
        type: String,
    },
    apartment: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "apart",
        required: true,
    },
    customer: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });
const BookingModel = mongoose_1.default.model("booking", bookingSchema);
exports.BookingModel = BookingModel;
