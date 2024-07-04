"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    token: "",
    userData: null,
    isAuthenticated: false,
};
const authSlice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userData = null;
            state.token = "";
            state.isAuthenticated = false;
        },
    },
});
_a = authSlice.actions, exports.login = _a.login, exports.logout = _a.logout;
exports.default = authSlice.reducer;
