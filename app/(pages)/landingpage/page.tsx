import Navbar from "@/app/components/navbar/nabvar";
import Link from "next/link";
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex justify-center items-center">
        <Link href="/auth/login">
          <div className="border-2 p-2 rounded-sm hover:bg-sky-500 duration-[0.4s]">
            <button className="italic">Get Starterd</button>
          </div>
        </Link>
      </div>
    </>
  );
};
export default LandingPage;
