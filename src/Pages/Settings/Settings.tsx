import React from "react";
import Layout from "../../Components/Layout/Layout";
import SettingsHeader from "../../Components/SettingsHeader";
import "./Settings.css";

const Settings: React.FC = () => {
  return (
    <Layout title="Settings">
      <div className="settings-container">
        <SettingsHeader />
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
