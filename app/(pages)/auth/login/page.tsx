"use client";
import { useState } from "react";
import Modal from "@/app/components/modal/modal";
import { modalProps } from "@/app/type";
import API from "@/app/utils/API";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/navbar/nabvar";
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

        {/* Overlay / Content */}
        <div className=" absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg flex h-[78vh] w-[80vw] max-w-5xl ">
            {/* Form Section */}
            <div className="w-1/2 flex justify-center items-center p-6">
              <form onSubmit={handleLogin} className="w-full max-w-sm">
                <h2 className="font-bold text-sky-600 text-[2rem] text-center font-mono mb-6">
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
                  className="w-full border-2 rounded-md shadow-lg p-2 font-mono hover:shadow-sky-500 transition"
                >
                  Login
                </button>
                {modal && <Modal {...modal} />}
              </form>
            </div>

            {/* Info Section */}
            <div className="w-1/2 bg-sky-600 text-white flex flex-col justify-center items-center p-6 rounded-r-lg">
              <h1 className="font-mono text-[2rem] mb-3 text-center">
                Todo List
              </h1>
              <p className="text-center font-mono mb-4">
                “Hari ini, jangan cuma hidup—taklukkan. Satu tugas, satu langkah
                maju. Gagal gak masalah, asal jangan diam. Ceklist itu bukti
                kamu bergerak. Let's go, pejuang mimpi!”
              </p>
              <Link href="/auth/register">
                <button className="border-2 rounded-md px-4 py-1 hover:bg-white hover:text-sky-600 transition font-mono">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
