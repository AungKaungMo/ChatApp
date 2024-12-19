import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface LoginState {
  user: null | { _id: string; name: string; email: string };
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useLoginStore = create<LoginState>((set: any) => ({
  user: JSON.parse(localStorage.getItem("chat_user") || "null"),
  setUser: (user: User) => {
    localStorage.setItem("chat_user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("chat_user");
    set({ user: null });
  },
}));
