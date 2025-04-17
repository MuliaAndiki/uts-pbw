"use client";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
const Navbar: React.FC = () => {
  return (
    <div className=" flexjustify-center">
      <div className="flex justify-around w-full ">
        <Link href="/landingpage" className="hover:scale-105 duration-[0.3s]">
          <div className="my-3  border-2 border-hidden p-2 px-6 rounded-full hover:bg-white hover:text-black text-white transition duration-300 flex items-center gap-x-2">
            <h1 className="font-mono ">Home</h1>
            <LayoutDashboard />
          </div>
        </Link>
        <Link href="https://github.com/MuliaAndiki/uts-pbw">
          <div className="flex hover:scale-105 duration-[0.3s]">
            <h1 className="font-mono my-3 border-2 border-hidden p-2 px-6 rounded-full hover:bg-white hover:text-black text-white transition duration-300">
              Github
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
