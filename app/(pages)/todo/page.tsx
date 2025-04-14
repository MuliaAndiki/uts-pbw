"use client";
import { useState } from "react";
import { ListTodo } from "lucide-react";
import API from "@/app/utils/API";
import Navbar from "@/app/components/navbar/nabvar";
const Todo = () => {
  const [todo, setTodo] = useState<string>("");
  const handleTodo = (e: React.FormEvent) => {
    e.preventDefault();
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
        </div>
      </div>
    </>
  );
};
export default Todo;
