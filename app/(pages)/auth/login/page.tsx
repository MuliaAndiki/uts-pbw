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
      <Navbar />
      <div className="w-screen min-h-screen flex justify-center items-center ">
        <div className="flex justify-center items-center shadow-lg h-[50vh] w-[50vw] ">
          <div className="w-[100vh] ">
            <div className="grid grid-cols-2 grid-rows-1 shadow-lg border-1 rounded-md">
              <div className=" h-[50vh] flex justify-center items-center ">
                <div className="flex justify-center items-center">
                  <form onSubmit={handleLogin}>
                    <label
                      htmlFor=""
                      className="font-bold text-sky-600  hover:shadow-sky-500 text-[3rem] p-2 flex justify-center font-mono"
                    >
                      Login
                    </label>
                    <div className="">
                      <div className="m-[1rem]">
                        <input
                          type="email"
                          className="border-1 rounded-md shadow-md w-[13vw] hover:shadow-sky-500 h-[4vh] p-2 outline-none"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="m-[1rem]">
                        <input
                          type="password"
                          className="border-1 rounded-md shadow-md hover:shadow-sky-500 w-[13vw] h-[4vh] p-2 outline-none"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="m-[1rem]">
                        <button
                          className="border-2 shadow-lg w-[13vw] rounded-md hover:shadow-sky-500 font-mono"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    {modal && <Modal {...modal} />}
                  </form>
                </div>
              </div>
              <div className="bg-sky-600 flex justify-center items-center">
                <div className="flex p-[1rem] justify-center items-center">
                  {/* <Image src={} alt="" width={} height={} /> */}
                  <div className="flex-col justify-center items-center">
                    <h1 className="font-mono text-center text-[2rem] mb-3">
                      Todo List
                    </h1>
                    <p className="text-center font-mono">
                      “Hari ini, jangan cuma hidup—taklukkan. Satu tugas, satu
                      langkah maju. Gagal gak masalah, asal jangan diam. Ceklist
                      itu bukti kamu bergerak. Let's go, pejuang mimpi!”
                    </p>

                    <div className="flex justify-center">
                      <Link href="/auth/register">
                        <button className="border-2 rounded-md hover:text-white px-2 duration-[0.3s] hover:shadow-lg shadow-cyan-500/50 font-mono mt-3">
                          Sign up
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
