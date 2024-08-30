import React, { useState } from "react";
import "./Pismo.css";
import SettingsHeader from "../../Components/SettingsHeader";
import Layout from "../../Components/Layout/Layout";

interface Letter {
  id: number;
  name: string;
  description: string;
}

const SettingsPismo: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([
    { id: 1, name: "Letter 1", description: "Description for Letter 1" },
    { id: 2, name: "Letter 2", description: "Description for Letter 2" },
    { id: 3, name: "Letter 3", description: "Description for Letter 3" },
  ]);

  const addLetter = () => {
    // TO DO: implement add letter logic
  };

  const deleteLetter = (id: number) => {
    // TO DO: implement delete letter logic
  };

  return (
    <Layout title="Pismo">
      <SettingsHeader />
      <div className="container">
        <div className="header">
          <h1>Settings Pismo</h1>
          <button className="add-letter-btn" onClick={addLetter}>
            Add Letter
          </button>
        </div>
        <ul className="letter-list">
          {letters.map((letter) => (
            <li key={letter.id}>
              {letter.name} - {letter.description}
              <button
                className="delete-letter-btn"
                onClick={() => deleteLetter(letter.id)}
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

export default SettingsPismo;
