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
                  <h1 className="flex justify-center font-mono text-[2rem]">
                    Todo Kita
                  </h1>
                  <p className="text-center font-mono">
                    Hari ini aku gak harus sempurna. Cukup bergerak, cukup
                    mencoba, cukup jadi sedikit lebih baik dari kemarin. Semua
                    hal besar dimulai dari langkah kecil yang dilakukan dengan
                    hati tenang.
                  </p>
                  <div className="flex justify-center">
                    <Link href="/auth/login">
                      <button className="p-1 border-2 rounded-md hover:text-white duration-[0.3s] mt-3 font-mono">
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
                    className="font-bold text-sky-600 hover:shadow-sky-500 text-[3rem] p-2 flex justify-center font-mono"
                  >
                    Register
                  </label>
                  <div className="">
                    <div className="m-[1rem]">
                      <label htmlFor="" className="font-mono">
                        Email:
                      </label>
                      <br />
                      <input
                        type="email"
                        className="border-1 rounded-md shadow-md w-[13vw] hover:shadow-sky-500 h-[4vh] p-2 outline
                      -none"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="m-[1rem] font-mono">
                      <label htmlFor="">Nama :</label> <br />
                      <input
                        type="text"
                        className="border-1 rounded-md shadow-md w-[13vw] hover:shadow-sky-500 h-[4vh] p-2 outline-none"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="m-[1rem] font-mono">
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
                        className="border-2 shadow-lg w-[13vw] rounded-md hover:shadow-sky-500 font-mono"
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
