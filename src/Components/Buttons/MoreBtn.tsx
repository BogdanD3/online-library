import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";

const MoreBtn = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const items: MenuProps["items"] = [
    {
      icon: <i className="bi bi-eye" style={{ fontSize: "1rem" }}></i>,
      label: <p style={{ margin: "0" }}>Detalji</p>,
      key: "0",
    },
    {
      icon: (
        <i className="bi bi-pencil-square" style={{ fontSize: "1rem" }}></i>
      ),
      label: <p style={{ margin: "0" }}>Izmjeni</p>,
      key: "1",
    },
    {
      icon: <i className="bi bi-trash3" style={{ fontSize: "1rem" }}></i>,
      label: <p style={{ margin: "0" }}>Obrisi</p>,
      key: "2",
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
            className="bi bi-three-dots-vertical"
            style={{ cursor: "pointer" }}
          ></i>
        </p>
      </Dropdown>
    </div>
  );
};

export default MoreBtn;
