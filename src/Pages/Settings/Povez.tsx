import React, { useState } from 'react';
import './SettingsPovez.css';

interface Connection {
  id: number;
  name: string;
  url: string;
}

const SettingsPovez: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([
    { id: 1, name: 'Connection 1', url: 'https://example.com' },
    { id: 2, name: 'Connection 2', url: 'https://example.net' },
    { id: 3, name: 'Connection 3', url: 'https://example.io' }
  ]);

  const addConnection = () => {
    // TO DO: implement add connection logic
  };

  const deleteConnection = (id: number) => {
    // TO DO: implement delete connection logic
  };

  return (
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
  );
};

export default SettingsPovez;