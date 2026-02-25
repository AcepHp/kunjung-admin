export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  firstName: string;
  lastName?: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  isSubscribe?: boolean;
}

export interface IProfileUpdate {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
}

export interface IPasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}