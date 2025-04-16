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
      <Navbar />
      <div className="w-screen min-h-screen flex justify-center items-center ">
        <div className="flex justify-center items-center shadow-lg h-[50vh] w-[50vw] rounded-md">
          <div className="w-[100vh] ">
            <div className="grid grid-cols-2 grid-rows-1 shadow-lg border-1">
              <div className="bg-sky-600 h-[50vh] flex justify-center items-center ">
                <div className="flex-col items-center justify-center p-[1rem]">
                  {/* <Image src={} width={} height={} alt=""></Image> */}
                  <h1 className="flex justify-center ">Todo Kita</h1>
                  <p className="italic">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Ipsa aliquam itaque accusamus, architecto pariatur nobis
                    voluptatem sed quam modi! Deserunt laudantium officia est,
                    necessitatibus architecto facere ex harum magni. Ipsa?
                  </p>
                  <div className="flex justify-center">
                    <Link href="/auth/login">
                      <button className="px-2 border-2 rounded-md hover:text-white duration-[0.3s]">
                        Sign In
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <form onSubmit={handleRegister}>
                  <label
                    htmlFor=""
                    className="font-bold text-sky-600 hover:shadow-sky-500 text-[3rem] p-2 flex justify-center"
                  >
                    Register
                  </label>
                  <div className="">
                    <div className="m-[1rem]">
                      <label htmlFor="">Email:</label>
                      <br />
                      <input
                        type="email"
                        className="border-1 rounded-md shadow-md w-[13vw] hover:shadow-sky-500 h-[4vh] p-2 outline
                      -none"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="m-[1rem]">
                      <label htmlFor="">Nama :</label> <br />
                      <input
                        type="text"
                        className="border-1 rounded-md shadow-md w-[13vw] hover:shadow-sky-500 h-[4vh] p-2 outline-none"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="m-[1rem]">
                      <label htmlFor="">Password:</label>
                      <br />
                      <input
                        type="password"
                        className="border-1 rounded-md shadow-md hover:shadow-sky-500 w-[13vw] h-[4vh] p-2 outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="m-[1rem]">
                      <button
                        className="border-2 shadow-lg w-[13vw] rounded-md hover:shadow-sky-500"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </div>
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
