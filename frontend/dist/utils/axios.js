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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.protectedApi = exports.api = void 0;
const axios_1 = __importStar(require("axios"));
const validate_1 = require("./validate");
const store_1 = require("../redux/store");
const jwt_decode_1 = require("jwt-decode");
const refreshTokens_1 = require("./refreshTokens");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
exports.api = axios_1.default.create({
    baseURL: validate_1.env.REACT_APP_API_BASE_URL,
});
// THe protected api will send the authorization header along with it
exports.protectedApi = axios_1.default.create({
    baseURL: validate_1.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: { Authorization: store_1.store.getState().auth.token },
});
// the two step protection for the expire token is as following
exports.protectedApi.interceptors.request.use(async (config) => {
    const token = store_1.store.getState().auth?.token;
    const decoded = (0, jwt_decode_1.jwtDecode)(token);
    const expiry = decoded?.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (expiry && expiry - currentTime <= 20) {
        await (0, refreshTokens_1.refreshing)().then(() => {
            const newToken = store_1.store?.getState().auth.token;
            config.headers["authorization"] = "Bearer " + newToken;
        });
    }
    else if (config.headers.authorization === undefined || null) {
        config.headers["authorization"] = "Bearer " + store_1.store.getState().auth.token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
exports.protectedApi.interceptors.response.use((response) => response, async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 || status === 403) {
        await (0, refreshTokens_1.refreshing)()
            .then(() => {
            const newToken = store_1.store?.getState().auth.token;
            error.config.headers["authorization"] = "Bearer " + newToken;
            error.config.baseURL = "";
            return exports.protectedApi.request(error.config);
        })
            .catch((err) => err);
    }
    return Promise.reject(error);
});
const handleError = (error) => {
    if ((0, axios_1.isAxiosError)(error)) {
        if (error?.response?.status === 401) {
            console.log(error);
            return;
        }
        else {
            react_hot_toast_1.default.error(error.response?.data?.errorMessage ||
                "something went wrong...try again later");
        }
    }
    else {
        react_hot_toast_1.default.error(error?.message);
    }
};
exports.handleError = handleError;
