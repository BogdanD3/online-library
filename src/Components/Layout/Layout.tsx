import React, { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import SideMenu from "./Sidemenu/Sidemenu";
import Title from "./Title/Title";

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <div>
        <Header />
      </div>
      <div className="layout">
        <div className="Sidemenu">
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="Title">
          <Title isOpen={isOpen} />
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
