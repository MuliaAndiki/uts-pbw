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
  const { todos, setTodos, token, id, curennt } = useHook();
  const [text, setText] = useState<string>("");
  const [modalData, setModalData] = useState<modalProps | null>(null);
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
            setTodos([]);
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
      <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-gray-700 to-white">
        {/* Navbar tetap di atas */}
        <div className="">
          <Navbar />
        </div>

        {/* Konten Utama */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-4xl px-4">
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Form Input Todo */}
              <form onSubmit={handleTodo} className="w-full">
                <label className="block text-3xl font-bold text-center text-gray-800 drop-shadow hover:text-sky-600 transition duration-500 font-mono">
                  TodoList: {curennt ? curennt.fullName : "Guest"}
                </label>

                <div className="flex flex-wrap items-center gap-x-2 mt-6">
                  <input
                    type="text"
                    className="flex-1 outline-none shadow-md p-3 rounded-md transition duration-300 hover:shadow-sky-400 hover:scale-105 border-b-1"
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Masukkan todo kamu..."
                  />

                  <ListTodo className="text-2xl text-gray-600 hover:text-sky-500 transition duration-300 hover:scale-105" />

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md font-semibold bg-sky-500 text-white hover:bg-sky-600 transition duration-300 hover:scale-105 font-mono"
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-md font-semibold bg-red-400 text-white hover:bg-red-500 transition duration-300 hover:scale-105 font-mono"
                    onClick={handleLoqout}
                  >
                    Quit
                  </button>
                </div>
              </form>

              {/* Modal muncul jika ada data */}
              {modalData && <Modal {...modalData} />}

              {/* Daftar Todo */}
              <div className="w-full mt-6 space-y-3 py-4 px-2 shadow-xl rounded-md bg-gray-400 bg-opacity-100 backdrop-blur-sm">
                {todos.map((todo, index) => (
                  <Return key={index} todo={todo} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
