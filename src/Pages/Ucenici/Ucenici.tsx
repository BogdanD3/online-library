import React from "react";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import Layout from "../../Components/Layout/Layout";
import UceniciTable from "./UceniciTable";
import "./Ucenici.css";

const Ucenici: React.FC = () => {
  return (
    <Layout title="Ucenici">
      <div className="bottom-right">
        <div className="top">
          <PrimaryBtn link="add-bibliotekar" className="primaryBtn">
            <i className="bi bi-plus-lg"></i> Novi Ucenik/ca
          </PrimaryBtn>
          <div className="search-bar">
            <i className="bi bi-search" />
            <input className="search-input" type="search"></input>
          </div>
        </div>
        <UceniciTable />
      </div>
    </Layout>
  );
};

export default Ucenici;
