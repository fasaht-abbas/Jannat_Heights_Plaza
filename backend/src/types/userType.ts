import { ObjectId } from "mongodb";

type UserDTO = {
  name: string;
  _id: string;
  email: string;
  googleId?: string;
  role: string;
  profilePhoto: string;
  address?: string;
  phone?: string;
  CNIC?: string;
  verifiedEmail?: Boolean;
  __v: number;
};

export default UserDTO;
