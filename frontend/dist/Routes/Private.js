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
const react_1 = __importStar(require("react"));
const axios_1 = require("../utils/axios");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const Loading_1 = __importDefault(require("../components/reuseables/Loading"));
const UnAuthorizedPage_1 = __importDefault(require("../components/reuseables/UnAuthorizedPage"));
const Private = () => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [authorized, setAuthorized] = (0, react_1.useState)(false);
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    const checkUser = async () => {
        try {
            setLoading(true);
            const { data } = await axios_1.protectedApi.get("/api/v1/auth/protected");
            if (data?.success) {
                setLoading(false);
                setAuthorized(true);
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
            setLoading(false);
            setAuthorized(false);
        }
    };
    (0, react_1.useEffect)(() => {
        const cleanup = () => { };
        if (token) {
            checkUser();
        }
        return cleanup;
    }, [token]);
    return loading ? <Loading_1.default /> : authorized ? <react_router_dom_1.Outlet /> : <UnAuthorizedPage_1.default />;
};
exports.default = Private;
