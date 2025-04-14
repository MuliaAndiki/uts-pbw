"use client";
import { useState } from "react";
import Modal from "@/app/components/modal/modal";
import { modalProps } from "@/app/type";
import API from "@/app/utils/API";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar/nabvar";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modal, setModal] = useState<modalProps | null>(null);
  const Router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    API.post("/auth/login", {
      email,
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
            Router.push("/home");
          },
        });
      })
      .catch((err) => {
        setModal({
          title: "Berhasil Login",
          icon: "error",
          deskripsi: "Selamat Datang",
          confirmButtonText: "lanjut",
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
                      className="font-bold text-sky-600  hover:shadow-sky-500 text-[3rem] p-2 flex justify-center"
                    >
                      Login:
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
                          className="border-2 shadow-lg w-[13vw] rounded-md hover:shadow-sky-500"
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
                    <h1 className="italic text-center">Todo List</h1>
                    <p className="text-center">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, qui harum. Non quis sequi eum iste voluptate.
                      Perspiciatis perferendis saepe, molestias ullam soluta
                      consequatur cupiditate est iure at non eum!
                    </p>

                    <div className="flex justify-center">
                      <Link href="/auth/register">
                        <button className="border-2 rounded-md hover:text-white">
                          sign up
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
