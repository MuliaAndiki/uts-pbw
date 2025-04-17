"use client";
import { useState } from "react";
import API from "@/app/utils/API";
import { modalProps } from "@/app/type";
import Modal from "@/app/components/modal/modal";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/components/auth/AuthLayout";

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
    <AuthLayout isLoginPage={false}>
      <form onSubmit={handleRegister} className="w-full max-w-sm">
        <h2 className="text-[2.5rem] text-[#0d222f] font-bold font-mono text-center mb-6">
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
    </AuthLayout>
  );
};

export default Register;