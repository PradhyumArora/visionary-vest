import Sidebar from "@/components/Sidebar";
import { Children, FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen w-full bg-black text-white flex">
      <Sidebar />
      <section className="p-8 w-full overflow-auto">{children}</section>
    </main>
  )
};

export default layout;
