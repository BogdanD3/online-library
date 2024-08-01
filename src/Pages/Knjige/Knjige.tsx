import React, { useState } from "react";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import Layout from "../../Components/Layout/Layout";
import KnjigeTable from "./KnjigeTable";
import "./Knjige.css";

const Knjige: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout title="Knjige">
      <div className="bottom-right">
        <div className="top">
          <PrimaryBtn link="add-knjiga" className="primaryBtn">
            <i className="bi bi-plus-lg"></i> Nova Knjiga
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
        <KnjigeTable searchQuery={searchQuery} />
      </div>
    </Layout>
  );
};

export default Knjige;
