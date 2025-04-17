"use client";
import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar/nabvar";

interface AuthLayoutProps {
  children: ReactNode;
  isLoginPage?: boolean;
}

export default function AuthLayout({
  children,
  isLoginPage = true,
}: AuthLayoutProps) {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(
    isLoginPage ? "login" : "register"
  );
  const router = useRouter();

  const handleTransition = (targetPage: string) => {
    setIsTransitioning(true);

    // Set a timeout to allow the animation to complete before navigation
    setTimeout(() => {
      router.push(targetPage === "login" ? "/auth/login" : "/auth/register");

      // Reset transition state after navigation
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentPage(targetPage);
      }, 50);
    }, 450); // Slightly less than animation duration
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/bg/bg-video2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg flex h-[78vh] w-[80vw] max-w-5xl overflow-hidden relative">
          {/* Form Container */}
          <div
            className={`w-full h-full flex ${
              isTransitioning ? "transition-transform duration-500" : ""
            }`}
          >
            {/* The Dark Panel */}
            <div
              className={`absolute bg-[#0d222f] w-1/2 h-full z-10 flex justify-center items-center p-6 text-white transition-transform duration-500 ease-in-out
                ${currentPage === "login" ? "left-1/2" : "left-0"}
                ${
                  isTransitioning && currentPage === "login"
                    ? "-translate-x-full"
                    : ""
                }
                ${
                  isTransitioning && currentPage === "register"
                    ? "translate-x-full"
                    : ""
                }`}
            >
              {/* Login panel content - hidden during transition */}
              {currentPage === "login" && (
                <div
                  className={`flex flex-col justify-center items-center text-center space-y-4 transition-opacity duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <h1 className="font-mono text-[2rem] mb-3 text-center">
                    Todo List
                  </h1>
                  <p className="text-center font-mono mb-4">
                    "Hari ini, jangan cuma hidup—taklukkan. Satu tugas, satu
                    langkah maju. Gagal gak masalah, asal jangan diam. Ceklist
                    itu bukti kamu bergerak. Let's go, pejuang mimpi!"
                  </p>
                  <button
                    onClick={() => handleTransition("register")}
                    className="border-2 rounded-md px-4 py-1 hover:bg-white hover:text-[#0d222f] transition font-mono"
                  >
                    Sign up
                  </button>
                </div>
              )}

              {/* Register panel content - hidden during transition */}
              {currentPage === "register" && (
                <div
                  className={`flex flex-col justify-center items-center text-center space-y-4 transition-opacity duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <h1 className="text-[2rem] font-mono font-bold">Todo Kita</h1>
                  <p className="font-mono">
                    Hari ini aku gak harus sempurna. Cukup bergerak, cukup
                    mencoba, cukup jadi sedikit lebih baik dari kemarin. Semua
                    hal besar dimulai dari langkah kecil yang dilakukan dengan
                    hati tenang.
                  </p>
                  <button
                    onClick={() => handleTransition("login")}
                    className="px-4 py-1 border-2 rounded-md hover:bg-white hover:text-[#0d222f] duration-300 font-mono mt-3"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Content Area - will show either login or register form */}
            <div className="w-full h-full grid grid-cols-2">
              {/* This is where the form content is placed */}
              <div
                className={`${
                  currentPage === "login" ? "order-1" : "order-2"
                } flex justify-center items-center p-6 transition-opacity duration-300 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {children}
              </div>
              <div
                className={`${currentPage === "login" ? "order-2" : "order-1"}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
