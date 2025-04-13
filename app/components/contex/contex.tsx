"use client";

import { createContext, useContext } from "react";
import { authPros } from "@/app/type";

const contex = createContext<{
  curennt: authPros | null;
  setCurrent: React.Dispatch<React.SetStateAction<authPros | null>>;
} | null>(null);

export const useHook = () => {
  const Todo = useContext(contex);
  if (!Todo) {
    throw new Error("");
  }
  return Todo;
};

export default contex;
