"use client";
import { useState } from "react";
import Modal from "@/app/components/modal/modal";
import { modalProps } from "@/app/type";
import API from "@/app/utils/API";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/components/auth/AuthLayout";
import { useHook } from "@/app/components/contex/contex";
import fetchTodos from "@/app/utils/Featch";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modal, setModal] = useState<modalProps | null>(null);
  const { setCurrent, setToken, setId, setTodos } = useHook();
  const Router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    API.post("/auth/login", {
      email,
      password,
    })
      .then((ress) => {
        console.log("ress data:", ress.data);
        const user = ress.data.data;
        const userToken = ress.data.data.token;
        const id = user._id;
        localStorage.setItem("curent", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(userToken));
        localStorage.setItem("id", id);
        setCurrent(user);
        setToken(userToken);
        setId(id);

        const fetchAfterLogin = () => {
          fetchTodos(userToken, setTodos);
          Router.push("/todo");
        };
        setModal({
          title: "Berhasil Login",
          icon: "success",
          deskripsi: "Selamat Datang",
          confirmButtonText: "lanjut",
          confirmButtonColor: "#3572EF",
          onClose: () => {
            setModal(null);
            Router.push("/todo");
            fetchAfterLogin();
          },
        });
      })
      .catch((err) => {
        setModal({
          title: "Gagal Login",
          icon: "error",
          deskripsi: "try again",
          confirmButtonText: "try",
          confirmButtonColor: "#3572EF",
          onClose: () => {
            setModal(null);
          },
        });
      });
  };

  return (
    <AuthLayout isLoginPage={true}>
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <h2 className="font-bold text-[#0d222f] text-[2rem] text-center font-mono mb-6">
          Login
        </h2>
        <div className="mb-4">
          <input
            type="email"
            className="w-full border rounded-md shadow-md p-2 outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full border rounded-md shadow-md p-2 outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full border-2 rounded-md px-4 py-1 hover:text-white hover:bg-[#0d222f] transition font-mono"
        >
          Login
        </button>
        {modal && <Modal {...modal} />}
      </form>
    </AuthLayout>
  );
};

export default Login;