import { useState, useEffect } from "react";
import "./Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown, MenuProps } from "antd";
import { ReadOutlined, MoreOutlined, LinkOutlined } from "@ant-design/icons";

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const items: MenuProps["items"] = [
    {
      icon: <i className="bi bi-bell" style={{ fontSize: "1rem" }}></i>,
      label: "Notifikacije",
      key: "0",
    },
    {
      icon: <i className="bi bi-plus-lg" style={{ fontSize: "1rem" }}></i>,
      label: "Dodaj knjigu",
      key: "1",
    },
    {
      icon: <LinkOutlined style={{ fontSize: "1rem" }} />,
      label: "bildStudio",
      key: "2",
    },
    {
      type: "divider",
    },
    {
      icon: (
        <i className="bi bi-person-circle" style={{ fontSize: "1rem" }}></i>
      ),
      label: "Profile",
      key: "3",
    },
  ];

  const handleResize = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <ReadOutlined style={{ marginRight: "1rem" }} />
        Online Biblioteka
      </div>
      <div className="header-right">
        <div className="header-function-btns">
          <i className="bi bi-bell"></i>
        </div>
        <div className="divider"></div>
        <div className="header-function-btns">
          <i className="bi bi-plus-lg"></i>
        </div>
        <div className="company">bildstudio</div>
        <div className="profile-img">
          <i className="bi bi-person-circle"></i>
        </div>
      </div>

      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        visible={dropdownVisible}
        onVisibleChange={(flag) => setDropdownVisible(flag)}
      >
        <p onClick={(e) => e.preventDefault()}>
          <MoreOutlined className="dots" />
        </p>
      </Dropdown>
    </header>
  );
}

export default Header;
