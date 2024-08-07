import React from 'react';

interface SettingsProps {
  // Dodati props
}

const Settings: React.FC<SettingsProps> = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="settings-header-button">Polisa</button>
        <button className="settings-header-button">Kategorije</button>
        <button className="settings-header-button">Zanrovi</button>
        <button className="settings-header-button">Izdavac</button>
        <button className="settings-header-button">Povez</button>
        <button className="settings-header-button">Format</button>
        <button className="settings-header-button">Pismo</button>
      </div>
      <div className="settings-section">
        <h2>Rok za rezervaciju</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum eligendi
          nihil, vel necessitatibus saepe laboriosam! Perspiciatis laboriosam
          culpa veritatis ea voluptatum commodi tempora unde, dolorum debitis
          quia id dicta vitae.
        </p>
        <div className="settings-input-container">
          <input type="text" className="settings-input" placeholder="..." />
          <span className="settings-input-label">dana</span>
        </div>
      </div>
      <div className="settings-section">
        <h2>Rok vracanja</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum eligendi
          nihil, vel necessitatibus saepe laboriosam! Perspiciatis laboriosam
          culpa veritatis ea voluptatum commodi tempora unde, dolorum debitis
          quia id dicta vitae.
        </p>
        <div className="settings-input-container">
          <input type="text" className="settings-input" placeholder="..." />
          <span className="settings-input-label">dana</span>
        </div>
      </div>
      <div className="settings-section">
        <h2>Rok konflikta</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum eligendi
          nihil, vel necessitatibus saepe laboriosam! Perspiciatis laboriosam
          culpa veritatis ea voluptatum commodi tempora unde, dolorum debitis
          quia id dicta vitae.
        </p>
        <div className="settings-input-container">
          <input type="text" className="settings-input" placeholder="..." />
          <span className="settings-input-label">dana</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;