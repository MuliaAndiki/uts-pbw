"use client";
import { useState } from "react";
import API from "@/app/utils/API";
import { modalProps } from "@/app/type";
import Modal from "@/app/components/modal/modal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar/nabvar";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modal, setModal] = useState<modalProps | null>(null);
  const Router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    API.post("/auth/register", {
      email,
      fullName,
      password,
    })
      .then((ress) => {
        console.log(ress.data);
        localStorage.setItem("curent", JSON.stringify(ress.data));
        setModal({
          title: "Berhasil Login",
          icon: "success",
          deskripsi: "Selamat Datang",
          confirmButtonText: "lanjut",
          confirmButtonColor: "#3572EF",
          onClose: () => {
            setModal(null);
            Router.push("/auth/login");
          },
        });
      })
      .catch((err) => {
        setModal({
          title: "Login Gagal",
          icon: "error",
          deskripsi: "Username dan kata sandi salah",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "try again!",
          onClose: () => {
            setModal(null);
          },
        });
      });
  };
  return (
    <>
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
          <div className="flex justify-center items-center shadow-lg h-[78vh] w-[80vw] rounded-md bg-white bg-opacity-90 backdrop-blur-sm">
            <div className="grid grid-cols-2 w-full h-full rounded-md overflow-hidden shadow-lg">
              {/* Info Section */}
              <div className="bg-sky-600 flex justify-center items-center p-8 text-white">
                <div className="flex flex-col justify-center items-center text-center space-y-4">
                  <h1 className="text-[2rem] font-mono font-bold">Todo Kita</h1>
                  <p className="font-mono">
                    Hari ini aku gak harus sempurna. Cukup bergerak, cukup
                    mencoba, cukup jadi sedikit lebih baik dari kemarin. Semua
                    hal besar dimulai dari langkah kecil yang dilakukan dengan
                    hati tenang.
                  </p>
                  <Link href="/auth/login">
                    <button className="px-4 py-1 border-2 rounded-md hover:bg-white hover:text-sky-600 duration-300 font-mono mt-3">
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>

              {/* Register Form */}
              <div className="flex justify-center items-center p-8">
                <form onSubmit={handleRegister} className="w-full max-w-sm">
                  <h2 className="text-[2.5rem] text-sky-600 font-bold font-mono text-center mb-6">
                    Register
                  </h2>
                  <div className="mb-4">
                    <label className="block font-mono mb-1">Email:</label>
                    <input
                      type="email"
                      className="w-full border rounded-md shadow-md p-2 outline-none hover:shadow-sky-500"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-mono mb-1">Nama:</label>
                    <input
                      type="text"
                      className="w-full border rounded-md shadow-md p-2 outline-none hover:shadow-sky-500"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-mono mb-1">Password:</label>
                    <input
                      type="password"
                      className="w-full border rounded-md shadow-md p-2 outline-none hover:shadow-sky-500"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full border-2 shadow-lg rounded-md p-2 font-mono hover:shadow-sky-500"
                  >
                    Register
                  </button>
                  {modal && <Modal {...modal} />}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
