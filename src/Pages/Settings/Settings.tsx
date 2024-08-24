import React from "react";
import Layout from "../../Components/Layout/Layout";
import "./Settings.css";

const Settings: React.FC = () => {
  return (
    <Layout title="Settings">
      <div className="settings-container">
        <div className="settings-header">
          <a href="#no" className="settings-header-link">
            Polisa
          </a>
          <a href="#going" className="settings-header-link">
            Kategorije
          </a>
          <a href="#going" className="settings-header-link">
            Zanrovi
          </a>
          <a href="#going" className="settings-header-link">
            Izdavac
          </a>
          <a href="#going" className="settings-header-link">
            Povez
          </a>
          <a href="#going" className="settings-header-link">
            Format
          </a>
          <a href="#aa" className="settings-header-link">
            Pismo
          </a>
        </div>
        <div className="settings-section">
          <h2>Rok za rezervaciju</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            eligendi nihil, vel necessitatibus saepe laboriosam! Perspiciatis
            laboriosam culpa veritatis ea voluptatum commodi tempora unde,
            dolorum debitis quia id dicta vitae.
          </p>
          <div className="settings-input-container">
            <input type="text" className="settings-input" placeholder="..." />
            <span className="settings-input-label">dana</span>
          </div>
        </div>
        <div className="settings-section">
          <h2>Rok vracanja</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            eligendi nihil, vel necessitatibus saepe laboriosam! Perspiciatis
            laboriosam culpa veritatis ea voluptatum commodi tempora unde,
            dolorum debitis quia id dicta vitae.
          </p>
          <div className="settings-input-container">
            <input type="text" className="settings-input" placeholder="..." />
            <span className="settings-input-label">dana</span>
          </div>
        </div>
        <div className="settings-section">
          <h2>Rok konflikta</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            eligendi nihil, vel necessitatibus saepe laboriosam! Perspiciatis
            laboriosam culpa veritatis ea voluptatum commodi tempora unde,
            dolorum debitis quia id dicta vitae.
          </p>
          <div className="settings-input-container">
            <input type="text" className="settings-input" placeholder="..." />
            <span className="settings-input-label">dana</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
