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