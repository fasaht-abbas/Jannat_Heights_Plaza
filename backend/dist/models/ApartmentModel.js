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
exports.ApartModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const appartSchema = new mongoose_1.Schema({
    no: {
        type: String,
        required: true,
    },
    floor: {
        type: String,
        enum: ["2", "3", "4", "5", "6"],
        required: true,
    },
    rent: {
        type: String,
        required: true,
    },
    bookings: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "booking",
    },
    //these booking would be of the type booking
    status: {
        type: String,
        enum: ["Booked", "Available"],
        default: "Available",
    },
}, { timestamps: true });
const ApartModel = mongoose_1.default.model("apart", appartSchema);
exports.ApartModel = ApartModel;
//# sourceMappingURL=ApartmentModel.js.map