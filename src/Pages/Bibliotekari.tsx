import React from "react";
import PrimaryBtn from "../Components/Buttons/PrimaryBtn";
import BibliotekariTable from "./Tables/BibliotekariTable";
import Layout from "../Components/Layout/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Bibliotekari.css";

const Bibliotekari: React.FC = () => {
  return (
    <Layout title="Bibliotekari">
      <div className="bottom-right">
        <div className="top">
          <PrimaryBtn link="add-bibliotekar" className="primaryBtn">
            <i className="bi bi-plus-lg"></i> Novi Bibliotekar/ka
          </PrimaryBtn>
          <div className="search-bar">
            <i className="bi bi-search" />
            <input className="search-input" type="search"></input>
          </div>
        </div>
        <BibliotekariTable />
      </div>
    </Layout>
  );
};

export default Bibliotekari;
