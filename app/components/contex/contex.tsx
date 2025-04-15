"use client";

import { createContext, useContext } from "react";
import { authPros, todosPros, tokenPros } from "@/app/type";

const contex = createContext<{
  curennt: authPros | null;
  setCurrent: React.Dispatch<React.SetStateAction<authPros | null>>;
  todos: todosPros[];
  setTodos: React.Dispatch<React.SetStateAction<todosPros[]>>;
  token: tokenPros | null;
  setToken: React.Dispatch<React.SetStateAction<tokenPros | null>>;
  isloading: boolean;
  id: authPros | null;
  setId: React.Dispatch<React.SetStateAction<authPros | null>>;
} | null>(null);

export const useHook = () => {
  const Todo = useContext(contex);
  if (!Todo) {
    throw new Error("");
  }
  return Todo;
};

export default contex;
