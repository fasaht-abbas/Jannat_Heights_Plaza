import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDTO } from "../components/interface";

export interface AuthState {
  token: string;
  userData: UserDTO | null;
  isAuthenticated: boolean;
}

interface LoginPayload {
  userData: UserDTO;
  token: string;
}

const initialState: AuthState = {
  token: "",
  userData: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<LoginPayload>) => {
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state: AuthState) => {
      state.userData = null;
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
