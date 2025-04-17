import Navbar from "@/app/components/navbar/nabvar";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/bg/bg-video2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/20 z-10"></div>

      <div
        className="relative z-20 flex flex-col justify-center items-center text-center px-4"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md">
          Stay Organized, Get Things Done
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl">
          Keep track of your tasks, boost your productivity, and make every day
          count. All in one simple to-do list app.
        </p>

        <Link href="/auth/login">
          <div className="mt-6 border-2 border-white p-2 px-6 rounded-full hover:bg-white hover:text-black text-white transition duration-300">
            <button className="italic font-semibold">Start Planning</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
