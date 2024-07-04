"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authSlice_1 = require("../../redux/authSlice");
const react_redux_1 = require("react-redux");
const Navicon_1 = __importDefault(require("./Navicon"));
const axios_1 = require("../../utils/axios");
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const LogoutButton = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleLogout = async () => {
        try {
            const { data } = await axios_1.api.post("/api/v1/auth/logout", {}, {
                withCredentials: true,
            });
            if (data?.success) {
                dispatch((0, authSlice_1.logout)());
                navigate("/login");
                react_hot_toast_1.default.success("user Logged Out");
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    return <Navicon_1.default onClickHandler={handleLogout} label="Logout"/>;
};
exports.default = LogoutButton;
