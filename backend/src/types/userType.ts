import { ObjectId } from "mongodb";

type UserDTO = {
  _id: ObjectId;
  name: string;
  email: string;
  googleId: string;
  role: string;
  profilePhoto: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export default UserDTO;
