import React, { useState } from "react";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import Layout from "../../Components/Layout/Layout";
import BibliotekariTable from "./BibliotekariTable";
import "./Bibliotekari.css";

const Bibliotekari: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout title="Bibliotekari">
      <div className="bottom-right">
        <div className="top">
          <PrimaryBtn link="add-bibliotekar" className="primaryBtn">
            <i className="bi bi-plus-lg"></i> Novi Bibliotekar/ka
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
        <BibliotekariTable searchQuery={searchQuery} />
      </div>
    </Layout>
  );
};

export default Bibliotekari;
