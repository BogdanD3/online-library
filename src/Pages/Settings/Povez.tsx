import React, { useState } from "react";
import "./Povez.css";
import Layout from "../../Components/Layout/Layout";
import SettingsHeader from "../../Components/SettingsHeader";
import Settings from "./Settings";

interface Connection {
  id: number;
  name: string;
  url: string;
}

const SettingsPovez: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([
    { id: 1, name: "Connection 1", url: "https://example.com" },
    { id: 2, name: "Connection 2", url: "https://example.net" },
    { id: 3, name: "Connection 3", url: "https://example.io" },
  ]);

  const addConnection = () => {
    // TO DO: implement add connection logic
  };

  const deleteConnection = (id: number) => {
    // TO DO: implement delete connection logic
  };

  return (
    <Layout title="Povez">
      <SettingsHeader />
      <div className="container">
        <div className="header">
          <h1>Settings Povez</h1>
          <button className="add-connection-btn" onClick={addConnection}>
            Add Connection
          </button>
        </div>
        <ul className="connection-list">
          {connections.map((connection) => (
            <li key={connection.id}>
              {connection.name} ({connection.url})
              <button
                className="delete-connection-btn"
                onClick={() => deleteConnection(connection.id)}
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

export default SettingsPovez;
