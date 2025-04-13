"use client";
import { useState, useEffect } from "react";
import { authPros } from "../type";
import contex from "../components/contex/contex";

export const Provinder = ({ children }: { children: React.ReactNode }) => {
  const [curennt, setCurrent] = useState<authPros | null>(null);

  useEffect(() => {
    const curents = localStorage.getItem("curent");
    if (curents) {
      try {
        setCurrent(JSON.parse(curents));
      } catch (err) {
        console.log("ambil data gagal dari curennt:", err);
        setCurrent(null);
      }
    }
  });
  useEffect(() => {
    localStorage.setItem("curent", JSON.stringify(curennt));
  }, [curennt]);

  return (
    <contex.Provider
      value={{
        curennt,
        setCurrent,
      }}
    >
      {children}
    </contex.Provider>
  );
};
