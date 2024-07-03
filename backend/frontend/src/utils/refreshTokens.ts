import { login } from "../redux/authSlice";
import { store } from "../redux/store";
import { api } from "./axios";

export const refreshing = async () => {
  const { data } = await api.get("/api/v1/auth/refresh-tokens", {
    withCredentials: true,
  });
  if (data?.success) {
    store.dispatch(
      login({
        token: data?.accessToken,
        userData: {
          name: data?.returnUser?.name,
          _id: data?.returnUser?._id,
          email: data?.returnUser?.email,
          googleId: data?.returnUser?.googleId,
          role: data?.returnUser?.role,
          profilePhoto: data?.returnUser?.profilePhoto,
          address: data?.returnUser?.address,
          phone: data?.returnUser?.phone,
          CNIC: data?.returnUser?.CNIC,
          verifiedEmail: data?.returnUser?.verifiedEmail,
        },
      })
    );
  } else {
    throw new Error("Something went wrong");
  }
};
