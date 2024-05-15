export interface LayoutWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

export interface UserDTO {
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
}

export interface AssetDTO {
  _id: string;
  type: string;
  for: string;
  link: string;
  set_as_home_page?: string;
}

export interface ApartDTO {
  _id: string;
  no: string;
  floor: string;
  rent: string;
  bookings: [""];
  status: string;
}
