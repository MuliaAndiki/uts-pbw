import { useState } from "react";
import { returnPros } from "@/app/type";
import { useHook } from "../contex/contex";
import API from "@/app/utils/API";
import { modalProps } from "@/app/type";
import Modal from "../modal/modal";

const Return: React.FC<returnPros> = ({ todo, index }) => {
  const { token, todos, setTodos, id } = useHook();
  const [checklist, setChecklist] = useState<boolean>(todo.onCheckList);

  const [edit, setEdit] = useState<boolean>(false);
  const [textEdit, setTextEdit] = useState<string>(todo.text);
  const [modalData, setModalData] = useState<modalProps | null>(null);

  const handleEdit = () => {
    setTextEdit(todo.text);
    API.put(
      `/todo/updateTodo/${todo._id}`,
      {
        text: textEdit,
        onCheckList: checklist,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        setEdit(false);
        const updateTodos = todos.map((prev) =>
          prev._id === todo._id
            ? { ...prev, text: textEdit, onChecklist: checklist }
            : prev
        );
        setTodos(updateTodos);
        setModalData({
          title: "Berhasil Update Todo",
          icon: "success",
          deskripsi: "Selamat Todo Kamu",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "OK!",
          onClose: () => {
            setModalData(null);
          },
        });
      })
      .catch((err) => {
        console.log("Edit Gagal", err);
        setModalData({
          title: "Gagal Update Todo",
          icon: "error",
          deskripsi: "Aduh Gagal",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "try again!",
          onClose: () => {
            setModalData(null);
          },
        });
      });
  };

  const handleDelete = () => {
    API.delete(`/todo/deleteTodo/${todo._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        const updatedTodos = todos.filter((prev) => prev._id !== todo._id);
        setModalData({
          title: "Berhasil Hapus",
          icon: "success",
          deskripsi: "Selamat Todo Kamu Berhasil Di hapus",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "OK!!",
          onClose: () => {
            setTodos(updatedTodos);
            setModalData(null);
          },
        });
      })
      .catch((err) => {
        console.log("Gagal Hapus", err);
        setModalData({
          title: "Gagal Hapus Todo",
          icon: "error",
          deskripsi: "Aduh gagal!",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "try again!",
          onClose: () => {
            setModalData(null);
          },
        });
      });
  };

  return (
    <form className="flex justify-around">
      <div className="flex gap-x-[1rem]">
        <input
          type="checkbox"
          className="border-2 rounded-md"
          checked={checklist}
          onChange={() => setChecklist(!checklist)}
        />
        {edit ? (
          <input
            type="text"
            value={textEdit}
            onChange={(e) => setTextEdit(e.target.value)}
            className="border px-2 py-1 rounded-md w-[30vw] p-1"
          />
        ) : (
          <div className="flex justify-center">
            <p
              className={`font-medium  border-b-1 w-[33vw] p-1 rounded-md hover:border-sky-600 duration-[0.3s] shadow-lg hover:shadow-sky-500 ${
                checklist ? "" : ""
              }`}
            >
              {todo.text}
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-[1rem]">
        {edit ? (
          <>
            <button
              type="button"
              onClick={handleEdit}
              className="bg-sky-500 text-white px-2 rounded hover:scale-105 duration-[0.3s] hover:bg-sky-600"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => {
                setTextEdit(todo.text), setEdit(false);
              }}
              className="bg-gray-500 text-white px-2 rounded duration-[0.3s] hover:scale-105 hover:bg-gray-600 font-mono"
            >
              Batal
            </button>
          </>
        ) : (
          <button
            type="button"
            className="border-b-1 rounded-md px-4 hover:scale-105 duration-[0.3s] p-2 bg-sky-400 text-white hover:bg-sky-600 font-mono "
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </button>
        )}
        <button
          type="button"
          className="border-b-1 rounded-md px-2 hover:scale-105 duration-[0.3s] bg-red-400 font-semibold text-white hover:bg-red-600 p-2 font-mono"
          onClick={handleDelete}
        >
          Hapus
        </button>
      </div>
      {modalData && <Modal {...modalData} />}
    </form>
  );
};

export default Return;
