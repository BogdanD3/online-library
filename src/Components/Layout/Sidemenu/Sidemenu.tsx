import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  path?: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [hoverDelayClass, setHoverDelayClass] = useState("");

  const openHandler = () => setIsOpen(!isOpen);

  const handleClick = (label: string) => {
    setActiveItem(label);
  };

  useEffect(() => {
    const currentPath = location.pathname;

    const activeMenuItem = menuItem.find((item) => item.path === currentPath);
    if (activeMenuItem) {
      setActiveItem(activeMenuItem.label || "");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      setHoverDelayClass("");
      const timer = setTimeout(() => {
        setHoverDelayClass("delayed-hover");
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setHoverDelayClass("");
    }
  }, [isOpen]);

  const menuItem: MenuItem[] = [
    { type: "divider" },
    {
      icon: <DashboardOutlined className="icon" />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <TeamOutlined className="icon" />,
      label: "Bibliotekari",
      path: "/bibliotekari",
    },
    {
      icon: <UsergroupAddOutlined className="icon" />,
      label: "Ucenici",
      path: "/ucenici",
    },
    {
      icon: <BookOutlined className="icon" />,
      label: "Knjige",
      path: "/knjige",
    },
    {
      icon: <SolutionOutlined className="icon" />,
      label: "Autori",
      path: "/autori",
    },
    {
      icon: <AccountBookOutlined className="icon" />,
      label: "Izdavanje knjiga",
    },
    { icon: <LaptopOutlined className="icon" />, label: "Expand example" },
    { type: "divider" },
    {
      icon: <SettingOutlined className="icon gear" />,
      label: "Settings",
      path: "/settings",
    },
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
          className={`bars ${isOpen ? hoverDelayClass : ""}`}
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
            <NavLink
              key={id}
              to={item.path || "#"}
              className={`menu_item ${
                item.label === activeItem ? "active" : ""
              }`}
              onClick={() => handleClick(item.label || "")}
              style={{
                color: "white",
                backgroundColor: item.label === activeItem ? "#333" : "",
              }}
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
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
