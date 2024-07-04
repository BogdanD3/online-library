import React, { useState } from "react";
import SideMenu from "./Components/Sidemenu/Sidemenu";
import Title from "./Components/Title/Title";
import Header from "./Components/Header/Header";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="app">
      <div>
        <Header />
      </div>
      <div className="layout">
        <div className="Sidemenu">
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="Title">
          <Title isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default App;
