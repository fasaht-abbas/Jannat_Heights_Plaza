import { UserDTO } from "../components/interface";
import { login } from "../redux/authSlice";
import { store } from "../redux/store";
import { api } from "./axios";

export const refreshing = async (): Promise<boolean> => {
  try {
    const { data } = await api.get("/api/v1/auth/refresh-tokens", {
      withCredentials: true,
    });
    if (data?.success) {
      store.dispatch(
        login({
          token: data?.accessToken,
          userData: data?.returnUser as UserDTO,
        })
      );
      return true;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    return false;
  }
};
