import React, { useState } from "react";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import Layout from "../../Components/Layout/Layout";
//import AutoriTable from "./AutoriTable";*/
import AutoriTable from "./AutoriTable"
import "./Autori.css";

const Autori: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout title="Autori">
      <div className="bottom-right">
        <div className="top">
          <PrimaryBtn link="add-autor" className="primaryBtn">
            <i className="bi bi-plus-lg"></i> Novi Autor
          </PrimaryBtn>
          <div className="search-bar">
            <i className="bi bi-search" />
            <input
              className="search-input"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <AutoriTable searchQuery={searchQuery} />
      </div>
    </Layout>
  );
};

export default Autori;