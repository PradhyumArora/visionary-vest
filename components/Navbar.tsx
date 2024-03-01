import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-black text-white px-8 py-4">
      <Image src="/logo.png" alt="logo" width={50} height={50} />
      <Link href="/login">Login / Signup</Link>
    </nav>
  );
};

export default Navbar;
