import Navbar from "@/app/components/navbar/nabvar";

const LandingPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Navbar />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/bg/desk.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Konten utama */}
      <div
        className="relative z-20 flex flex-col justify-center items-center text-center px-4"
        style={{ height: "calc(100vh - 5rem)" }} // pengaturan posisi konten
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md">
          WELCOME TO OUR WEBSITE
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <button className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
