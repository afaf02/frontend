// services/user.ts

import { api } from "../config/axios";
import { User } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get(`/students`);
  return response.data;
};

export const updateBrokerStatus = async (id: string, status: string) => {
  const response = await api.put(`/admin/users/${id}`, {
    brokerStatus: status,
  });
  return response.data;
};
