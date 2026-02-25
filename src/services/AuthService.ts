import { ILoginForm, IRegisterForm } from "@/types/authType";
import axios from "@/libs/axios";

export const loginUser = (payload: ILoginForm) => {
  return axios.post("/auth/super-admin/login", payload);
};

export const registerUser = (payload: IRegisterForm) => {
  return axios.post("/auth/super-admin/register", payload);
};



