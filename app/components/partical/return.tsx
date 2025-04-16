import { useState } from "react";
import { returnPros } from "@/app/type";
import { useHook } from "../contex/contex";
import API from "@/app/utils/API";

const Return: React.FC<returnPros> = ({ todo, index }) => {
  const { token, todos, setTodos } = useHook();
  const [checklist, setChecklist] = useState<boolean>(todo.onCheckList);

  const [edit, setEdit] = useState<boolean>(false);
  const [textEdit, setTextEdit] = useState<string>(todo.text);

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
      })
      .catch((err) => {
        console.log("Edit Gagal", err);
      });
  };

  const handleDelete = () => {
    API.delete(`/todo/deleteTodo/${todo._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        const updatedTodos = todos.filter((prev) => prev._id !== todo._id);
        setTodos(updatedTodos);
      })
      .catch((err) => {
        console.log("Gagal Hapus", err);
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
            className="border px-2 py-1 rounded-md"
          />
        ) : (
          <p className={`font-semibold ${checklist ? "" : ""}`}>{todo.text}</p>
        )}
      </div>
      <div className="flex gap-[1rem]">
        {edit ? (
          <>
            <button
              type="button"
              onClick={handleEdit}
              className="bg-sky-500 text-white px-2 rounded"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => {
                setTextEdit(todo.text), setEdit(false);
              }}
              className="bg-gray-500 text-white px-2 rounded"
            >
              Batal
            </button>
          </>
        ) : (
          <button
            type="button"
            className="border-2 rounded-md"
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </button>
        )}
        <button
          type="button"
          className="border-2 rounded-md"
          onClick={handleDelete}
        >
          Hapus
        </button>
      </div>
    </form>
  );
};

export default Return;
