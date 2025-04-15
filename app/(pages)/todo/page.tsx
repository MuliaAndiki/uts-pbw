"use client";
import { useState } from "react";
import { ListTodo } from "lucide-react";
import API from "@/app/utils/API";
import Navbar from "@/app/components/navbar/nabvar";
import { useHook } from "@/app/components/contex/contex";
import Modal from "@/app/components/modal/modal";
import { modalProps } from "@/app/type";
const Todo = () => {
  const [text, setText] = useState<string>("");
  const [modaData, setModalData] = useState<modalProps | null>(null);
  const handleTodo = (e: React.FormEvent) => {
    e.preventDefault();
    API.post("todo/createTodo", {
      text,
    })
      .then((res) => {
        console.log(res.data);
        setModalData({
          title: "todo Berhasil Di tambahkan",
          icon: "success",
          deskripsi: "Selamat Todo anda Telah Di Tambahakan",
          confirmButtonText: "OK!!",
          confirmButtonColor: "#3572EF",
          onClose: () => {
            setModalData(null);
          },
        });
      })
      .catch((err) => {
        setModalData({
          title: "Todo Gagal di tambahakan!",
          icon: "error",
          deskripsi: "Gagal Create Todo",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "Ulangi!",
          onClose: () => {
            setModalData(null);
          },
        });
      });
  };
  return (
    <>
      <Navbar />
      <div className="h-screen w-screen flex justify-center items-center  ">
        <div className="flex-col justify-center items-center text-center">
          <form>
            <label
              htmlFor=""
              className="text-[2rem] font-bold hover:text-sky-400 duration-[1s] "
            >
              Todo :
            </label>
            <div className="flex rounded-md border-2 p-1 w-[80vw]">
              <input type="text" className="w-[80vw] outline-none" />
              <ListTodo />
            </div>
          </form>
          {modaData && <Modal {...modaData} />}
        </div>
      </div>
    </>
  );
};
export default Todo;
