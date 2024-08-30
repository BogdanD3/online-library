import React, { useState } from "react";
import "./Format.css";
import Layout from "../../Components/Layout/Layout";
import SettingsHeader from "../../Components/SettingsHeader";

interface Format {
  id: number;
  name: string;
  description: string;
}

const SettingsFormat: React.FC = () => {
  const [formats, setFormats] = useState<Format[]>([
    { id: 1, name: "Format 1", description: "Description for Format 1" },
    { id: 2, name: "Format 2", description: "Description for Format 2" },
    { id: 3, name: "Format 3", description: "Description for Format 3" },
  ]);

  const addFormat = () => {
    // TO DO: implement add format logic
  };

  const deleteFormat = (id: number) => {
    // TO DO: implement delete format logic
  };

  return (
    <Layout title="Format">
      <SettingsHeader />
      <div className="container">
        <div className="header">
          <h1>Settings Format</h1>
          <button className="add-format-btn" onClick={addFormat}>
            Add Format
          </button>
        </div>
        <ul className="format-list">
          {formats.map((format) => (
            <li key={format.id}>
              {format.name} - {format.description}
              <button
                className="delete-format-btn"
                onClick={() => deleteFormat(format.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default SettingsFormat;
