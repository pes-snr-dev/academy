import React from "react";
import Drawer from "@components/Drawer";

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
