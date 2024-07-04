"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authSlice_1 = __importDefault(require("./authSlice"));
const redux_persist_1 = require("redux-persist");
const storage_1 = __importDefault(require("redux-persist/lib/storage"));
const authPersistConfig = {
    key: "is_logged_in_status",
    storage: storage_1.default,
    whitelist: ["isAuthenticated"],
};
const authPersistedReducer = (0, redux_persist_1.persistReducer)(authPersistConfig, authSlice_1.default);
const store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: authPersistedReducer,
    },
});
exports.store = store;
const persistor = (0, redux_persist_1.persistStore)(store);
exports.persistor = persistor;
