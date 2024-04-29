import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type appDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const authPersistConfig = {
  key: "is_logged_in_status",
  storage,
  whitelist: ["isAuthenticated"],
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
