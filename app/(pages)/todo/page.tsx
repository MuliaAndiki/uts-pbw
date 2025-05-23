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
      <div className="min-h-screen w-screen flex flex-col bg-[#dbdbdb]">
        <div className="bg-[#0d222f]">
          <Navbar />
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-4xl px-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <form onSubmit={handleTodo} className="w-full">
                <label className=" block text-5xl font-bold text-center text-gray-800 drop-shadow font-mono h-[150px]">
                  Welcome {curennt ? curennt.fullName : "Guest"}
                  <h1 className="font-normal text-lg mt-3">
                    Let’s make today productive and move one step closer to your
                    goals!
                  </h1>
                </label>

                <div className="flex flex-wrap items-center gap-x-2 mt-6">
                  <div className="flex-1 shadow-md p-3 rounded-md transition duration-300 bg-gray-300 hover:shadow-sky-400 hover:scale-103 border-b-1 flex flex-row justify-end">
                    <input
                      type="text"
                      className="w-[47vw] outline-none"
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Masukkan todo kamu..."
                    />
                    <ListTodo className="text-2xl text-gray-600" />
                  </div>
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

              {modalData && <Modal {...modalData} />}

              <div className="w-full mt-6 space-y-3 py-4 px-2 ">
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
