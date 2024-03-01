import Sidebar from "@/components/Sidebar";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="bg-black">
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default layout;
