"use client";
import { useState } from "react";
import { ListTodo } from "lucide-react";
import API from "@/app/utils/API";
import Navbar from "@/app/components/navbar/nabvar";
import { useHook } from "@/app/components/contex/contex";
import Modal from "@/app/components/modal/modal";
import { modalProps } from "@/app/type";
import Return from "@/app/components/partical/return";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Todo = () => {
  const { todos, setTodos, token, isloading, id, curennt } = useHook();
  const [text, setText] = useState<string>("");
  const [modaData, setModalData] = useState<modalProps | null>(null);
  const router = useRouter();

  const handleTodo = (e: React.FormEvent) => {
    e.preventDefault();
    API.post(
      "/todo/createTodo",
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setTodos((prev) => [...prev, res.data.data]);
        console.log("data todos", todos);
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
        setText("");
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
  const handleLoqout = () => {
    API.post(`/auth/logout/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log("Logout berhasil", res);
        setModalData({
          title: "Berhasil Keluar",
          icon: "success",
          deskripsi: "BABAY",
          confirmButtonText: "lanjut",
          confirmButtonColor: "#3572EF",
          onClose: () => {
            router.push("/landingpage");
            localStorage.removeItem("curent");
            localStorage.removeItem("token");
            localStorage.removeItem("id");
          },
        });
      })
      .catch((err) => {
        setModalData({
          title: "Gagal Keluar",
          icon: "error",
          deskripsi: "Coba Lagi",
          confirmButtonText: "lanjut",
          confirmButtonColor: "#3572EF",
          onClose: () => {
            setModalData(null);
          },
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="flex-col justify-center items-center text-center">
            <form onSubmit={handleTodo}>
              <label
                htmlFor=""
                className="text-[2rem] font-bold hover:text-sky-400 duration-[1s] "
              >
                TodoList : {curennt ? curennt.fullName : "guest"}
              </label>
              <div className="flex rounded-md border-2 p-1 w-[80vw] ">
                <input
                  type="text"
                  className="w-[80vw] outline-none"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Masukan Todo Kamu..."
                />
                <ListTodo />
                <button
                  className="border-2 rounded-md px-2 hover:bg-sky-600 duration-[1s] mx-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            {modaData && <Modal {...modaData} />}
            {todos.map((todo, index) => (
              <Return key={index} todo={todo} index={index} />
            ))}
          </div>
          <button onClick={handleLoqout} className="border-2 rounded-md">
            Quit
          </button>
        </div>
      </div>
    </>
  );
};
export default Todo;
