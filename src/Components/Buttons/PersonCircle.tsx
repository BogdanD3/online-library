import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";
import { logout } from "../../Shared/api";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const PersonCircle = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      icon: (
        <i className="bi bi-person-circle" style={{ fontSize: "1rem" }}></i>
      ),
      label: "Profile",
      key: "1",
      onClick: () => navigate("/profile"),
    },
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
          <i
            className="bi bi-person-circle"
            style={{ cursor: "pointer", fontSize: "2rem" }}
          ></i>
        </p>
      </Dropdown>
    </div>
  );
};

export default PersonCircle;
