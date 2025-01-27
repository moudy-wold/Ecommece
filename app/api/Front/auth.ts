import { AxiosResponse } from "axios";
import axios from "./axios";

export interface User {
  token: string;
  user: {
    _id: string;
    email: string;
    user_role: "user" | "admin";
  };
}

export async function Login(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/user/login`, data);
}

export async function LogOut(): Promise<AxiosResponse<any>> {
  return await axios.post(`/user/logout`);
}

export async function Register(
  data: any
): Promise<AxiosResponse<any>> {
  return await axios.post(`/user/register`, data);
}
