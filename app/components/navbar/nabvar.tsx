import Link from "next/link";
import { LayoutDashboard, LogIn } from "lucide-react";
const Navbar: React.FC = () => {
  return (
    <div className=" flexjustify-center">
      <div className="flex justify-around w-full">
        <Link href="/landingpage">
          <div className="flex gap-x-3">
            <h1 className="italic">Home</h1>
            <LayoutDashboard />
          </div>
        </Link>
        <Link href="">
          <div className="flex">
            <h1 className="italic">Dasboard</h1>
          </div>
        </Link>
        <Link href="/auth/login">
          <div className="flex gap-x-2">
            <h1 className="italic">Sign In</h1>
            <LogIn />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
