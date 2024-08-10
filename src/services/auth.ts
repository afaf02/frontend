import { api } from "../config/axios";
import { Admin, User } from "../types/user";

export const adminLogin = async (email: string, password: string) => {
  const { data } = await api.post<any>(`/admin/login`, {
    email,
    password,
  });
  console.log("Successful Login:", data);
  return data;
};

export const studentLogin = async (email: string, password: string) => {
  const { data } = await api.post<any>(`/auth/login`, {
    email,
    password,
  });
  console.log("Successful Login:", data);
  return data;
};

export const studentRegister = async (body: User) => {
  const data = await api.post<any>(`/auth/register`, body);
  console.log("Successful Login:", data);
  return data;
};

export const getUser = async () => {
  const { data } = await api.get<{ result: Admin }>(`/User/Details`);
  console.log("User:", data.result);
};
