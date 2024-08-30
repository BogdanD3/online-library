import React, { useState } from "react";
import "./Izdavac.css";
import Layout from "../../Components/Layout/Layout";
import SettingsHeader from "../../Components/SettingsHeader";

interface Publisher {
  id: number;
  name: string;
}

const SettingsIzdavac: React.FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([
    { id: 1, name: "Publisher 1" },
    { id: 2, name: "Publisher 2" },
    { id: 3, name: "Publisher 3" },
  ]);

  const addPublisher = () => {
    // TO DO: implement add publisher logic
  };

  const deletePublisher = (id: number) => {
    // TO DO: implement delete publisher logic
  };

  return (
    <Layout title="Izdavac">
      <SettingsHeader />
      <div className="container">
        <div className="header">
          <h1>Settings Izdavac</h1>
          <button className="add-publisher-btn" onClick={addPublisher}>
            Add Publisher
          </button>
        </div>
        <ul className="publisher-list">
          {publishers.map((publisher) => (
            <li key={publisher.id}>
              {publisher.name}
              <button
                className="delete-publisher-btn"
                onClick={() => deletePublisher(publisher.id)}
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

export default SettingsIzdavac;
