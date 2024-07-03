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

export interface BookingDTO {
  _id: string;
  from: Date;
  to: Date;
  status: string;
  payment_meathod: string;
  payment_cleared: boolean;
  payment_amount: number;
  payment_receipt: string;
  apartment: ApartDTO;
  customer: UserDTO;
  booking_time: Date;
}

export interface ApartDTO {
  _id: string;
  no: string;
  floor: string;
  rent: number;
  bookings: BookingDTO[];
  status: string;
}
