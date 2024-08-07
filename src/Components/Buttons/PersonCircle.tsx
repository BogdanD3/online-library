import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";
import { logout } from "../../Shared/api";
import "bootstrap-icons/font/bootstrap-icons.css";

const PersonCircle = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const items: MenuProps["items"] = [
    {
      icon: (
        <i className="bi bi-box-arrow-right" style={{ fontSize: "1rem" }}></i>
      ),
      label: "Logout",
      key: "0",
      onClick: () => logout(),
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
    <div>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        visible={dropdownVisible}
        onVisibleChange={(flag) => setDropdownVisible(flag)}
      >
        <p onClick={(e) => e.preventDefault()}>
          <i className="bi bi-person-circle" style={{ cursor: "pointer" }}></i>
        </p>
      </Dropdown>
    </div>
  );
};

export default PersonCircle;
