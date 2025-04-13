"use client";
import { useState } from "react";
import API from "@/app/utils/API";
import { modalProps } from "@/app/type";
import { useHook } from "@/app/components/contex/contex";
import Modal from "@/app/components/modal/modal";
import { useRouter } from "next/navigation";
const Register = () => {
  const { setCurrent } = useHook();
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
          deskripsi: "Selamat Datang Di KostHub",
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
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="flex justify-center items-center bg-white h-[50vh] w-[50vw] rounded-md">
        <div className="grid grid-cols-2 grid-rows-1 shadow-lg border-1">
          <div className="bg-sky-600 h-[50vh] flex justify-center items-center w-[51vh]">
            <h1 className="">Ini kiri</h1>
          </div>
          <div className="flex justify-center items-center">
            <form onSubmit={handleRegister}>
              <label
                htmlFor=""
                className="font-bold text-sky-600 hover:underline text-[2rem] p-2 flex justify-center"
              >
                Register:
              </label>
              <div className="">
                <div className="m-[1rem]">
                  <input
                    type="email"
                    className="border-1 rounded-md bg-amber-50 w-[13vw] h-[4vh] p-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="m-[1rem]">
                  <input
                    type="text"
                    className="border-1 rounded-md bg-amber-50 w-[13vw] h-[4vh] p-2"
                    placeholder="Nama"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="m-[1rem]">
                  <input
                    type="password"
                    className="border-1 rounded-md bg-amber-50 w-[13vw] h-[4vh] p-2"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="m-[1rem]">
                  <button
                    className="border-2 bg-amber-50 w-[13vw] rounded-md"
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
  );
};
export default Register;
