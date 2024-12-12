import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginState {
  user: null | { id: string; name: string; email: string };
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useLoginStore = create<LoginState>((set: any) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
