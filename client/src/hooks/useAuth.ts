import axiosInstance from "../api/axiosInstance";

export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  name: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";

const register = async (user: Register): Promise<AuthResponse> => {
  try {
    const { data } = await axiosInstance.post("auth/register", user);
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Login failed.");
    }
  }
};

const login = async (user: Login): Promise<AuthResponse> => {
  try {
    const { data } = await axiosInstance.post("auth/login", user);
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Login failed.");
    }
  }
};

const logout = async (): Promise<AuthResponse> => {
  try {
    const { data } = await axiosInstance.post("auth/logout");
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Logout failed.");
    }
  }
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, Register>({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registerUser"] });
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logoutUser"] });
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, Login>({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loginUser"] });
    },
  });
};
