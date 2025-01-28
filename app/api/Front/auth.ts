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

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  user_rols: string;
}

type LoginRes = {
  message: string;
  token: string;
  user_role: string;
};

type RegsiterRes = {
  name: string;
  email: string;
  password: string;
  user_role: string;
};

export async function Login(data: LoginData): Promise<AxiosResponse<LoginRes>> {
  return await axios.post(`/user/login`, data);
}

export async function LogOut(): Promise<AxiosResponse<string>> {
  return await axios.post(`/user/logout`);
}

export async function Register(
  data: RegisterData
): Promise<AxiosResponse<RegsiterRes>> {
  return await axios.post(`/user/register`, data);
}
