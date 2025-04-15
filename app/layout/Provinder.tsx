"use client";
import { useState, useEffect } from "react";
import { authPros, todosPros, tokenPros } from "../type";
import contex from "../components/contex/contex";

export const Provinder = ({ children }: { children: React.ReactNode }) => {
  const [curennt, setCurrent] = useState<authPros | null>(null);
  const [todos, setTodos] = useState<todosPros[]>([]);
  const [token, setToken] = useState<tokenPros | null>(null);
  const [isloading, setIsloading] = useState<boolean>(true);
  useEffect(() => {
    const curents = localStorage.getItem("curent");
    const tokens = localStorage.getItem("token");
    if (curents) {
      try {
        setCurrent(JSON.parse(curents));
      } catch (err) {
        console.log("gagal data dari curennt:", err);
        setCurrent(null);
      }
    }
    if (tokens) {
      try {
        setToken(JSON.parse(tokens));
      } catch (err) {
        console.log("gagal parse token:", err);
        setToken(null);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("curent", JSON.stringify(curennt));
  }, [curennt]);
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <contex.Provider
      value={{
        curennt,
        setCurrent,
        todos,
        setTodos,
        token,
        setToken,
        isloading,
      }}
    >
      {children}
    </contex.Provider>
  );
};
