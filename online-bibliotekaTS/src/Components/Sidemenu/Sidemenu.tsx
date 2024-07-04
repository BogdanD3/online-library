import React, { useState } from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  SolutionOutlined,
  AccountBookOutlined,
  LaptopOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./Sidemenu.css";

interface SideMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuItem {
  type?: string;
  icon?: JSX.Element;
  label?: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, setIsOpen }) => {
  const [clicked, setClicked] = useState<number>(1); // Set initial state with type number

  const clickedItemHandler = (id: number) => setClicked(id);
  const openHandler = () => setIsOpen(!isOpen);

  const menuItem: MenuItem[] = [
    { type: "divider" },
    { icon: <DashboardOutlined className="icon" />, label: "Dashboard" },
    { icon: <TeamOutlined className="icon" />, label: "Bibliotekari" },
    { icon: <UsergroupAddOutlined className="icon" />, label: "Ucenici" },
    { icon: <BookOutlined className="icon" />, label: "Knjige" },
    { icon: <SolutionOutlined className="icon" />, label: "Autori" },
    {
      icon: <AccountBookOutlined className="icon" />,
      label: "Izdavanje knjiga",
    },
    { icon: <LaptopOutlined className="icon" />, label: "Expand example" },
    { type: "divider" },
    { icon: <SettingOutlined className="icon gear" />, label: "Settings" },
  ];

  return (
    <div className="sidebar" style={{ width: isOpen ? "13rem" : "4.6rem" }}>
      <div
        className="bars-wrapper"
        style={{
          padding: "1.7rem 0 1.2rem 0.4rem",
          marginLeft: isOpen ? "1rem" : "0rem",
        }}
      >
        <UnorderedListOutlined
          className="bars"
          style={{ padding: isOpen ? "0.3rem 4rem" : "0.3rem 1rem" }}
          onClick={openHandler}
        />
      </div>

      <div>
        {menuItem.map((item, id) => {
          if (item.type === "divider") {
            return <hr key={id} className="sidemenu-divider" />;
          }
          return (
            <div
              key={id}
              className={`menu_item ${clicked === id ? "clicked" : ""}`}
              onClick={() => clickedItemHandler(id)}
            >
              <div className="icon">{item.icon}</div>
              <div
                className="link-text"
                style={{
                  display: isOpen ? "block" : "none",
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
