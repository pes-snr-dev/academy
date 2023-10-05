import React from "react";
import Drawer from "@components/Drawer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container">
        <div className="row flex-nowrap">
          <Drawer />
          <div className="col py-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default layout;
