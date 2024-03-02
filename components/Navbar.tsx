import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="z-[50] fixed top-0 w-full bg-transparent border-b border-transparent">
      <nav className="container flex h-16 justify-between items-center max-w-[88rem] mx-auto">
        <Image src="/logo.png" alt="logo" width={50} height={50} />

        <div className="flex gap-8">
          <Link href="/explore">Explore</Link>
          <Link href="/sign-up">Signup</Link>
          <Link href="/sign-in">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
