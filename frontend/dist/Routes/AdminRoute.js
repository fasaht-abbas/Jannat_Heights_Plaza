"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const UnAuthorizedPage_1 = __importDefault(require("../components/reuseables/UnAuthorizedPage"));
const AdminRoute = () => {
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    return userData?.role === "admin" ? <react_router_dom_1.Outlet /> : <UnAuthorizedPage_1.default />;
};
exports.default = AdminRoute;
