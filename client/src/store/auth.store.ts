import { create } from "zustand";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
}

interface LoginState {
  user: null | { _id: string; name: string; email: string; imageUrl?: string };
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useLoginStore = create<LoginState>((set: any) => ({
  user: JSON.parse(localStorage.getItem("chat_user") || "null"),
  setUser: (user: IUser) => {
    localStorage.setItem("chat_user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("chat_user");
    set({ user: null });
  },
}));
