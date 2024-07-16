import React, { ReactNode, useState } from "react";
import LeftHeader from "./Header/LeftHeader";
import RightHeader from "./Header/RightHeader";
import SideMenu from "./Sidemenu/Sidemenu";
import Title from "./Title/Title";
import "./Layout.css";

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="layout">
      <div id="left" className="column">
        <div className="top-left">
          <LeftHeader />
        </div>
        <div className="bottom-left">
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <div id="right" className="column">
        <div className="top-right">
          <RightHeader />
          <div>{title && <Title isOpen={isOpen} title={title} />}</div>
        </div>

        <div className="bottom-right">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
