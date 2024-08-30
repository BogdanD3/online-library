import React, { useState } from "react";
import "./Zanrovi.css";
import Layout from "../../Components/Layout/Layout";
import SettingsHeader from "../../Components/SettingsHeader";

interface Genre {
  id: number;
  name: string;
}

const SettingsZanrovi: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([
    { id: 1, name: "Genre 1" },
    { id: 2, name: "Genre 2" },
    { id: 3, name: "Genre 3" },
  ]);

  const addGenre = () => {
    // TO DO: implement add genre logic
  };

  const deleteGenre = (id: number) => {
    // TO DO: implement delete genre logic
  };

  return (
    <Layout title="Zanrovi">
      <SettingsHeader />
      <div className="container">
        <div className="header">
          <h1>Settings Zanrovi</h1>
          <button className="add-genre-btn" onClick={addGenre}>
            Add Genre
          </button>
        </div>
        <ul className="genre-list">
          {genres.map((genre) => (
            <li key={genre.id}>
              {genre.name}
              <button
                className="delete-genre-btn"
                onClick={() => deleteGenre(genre.id)}
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

export default SettingsZanrovi;
