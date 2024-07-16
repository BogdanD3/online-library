import React from "react";
import "./Title.css";

interface TitleProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ isOpen, title, children }) => {
  return (
    <div className="title-wrapper">
      <div className="title">
        <h1>{title || children}</h1>
      </div>
      <hr className="title-divider" />
    </div>
  );
};

export default Title;
