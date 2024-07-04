import React from "react";
import "./Title.css";

interface TitleProps {
  isOpen: boolean;
}

const Title: React.FC<TitleProps> = ({ isOpen }) => {
  return (
    <div className={isOpen ? "title-wrapper-opened" : "title-wrapper-closed"}>
      <div className="title">
        <h1>Title</h1>
      </div>
      <hr className="title-divider" />
    </div>
  );
};

export default Title;
