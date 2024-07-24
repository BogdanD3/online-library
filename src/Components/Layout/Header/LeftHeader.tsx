import { ReadOutlined } from "@ant-design/icons";
import "./LeftHeader.css";

const LeftHeader = () => {
  return (
    <div className="left-header">
      <div className="logo">
        <ReadOutlined style={{ marginRight: "1.5rem" }} />
        Online Biblioteka
      </div>
    </div>
  );
};

export default LeftHeader;
