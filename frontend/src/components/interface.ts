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
  verifiedPhone?: Boolean;
}
