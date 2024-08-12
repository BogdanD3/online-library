import React, { useState, useEffect, useCallback, Fragment } from "react";
import ApiService from "../../Shared/api";
import Layout from "../../Components/Layout/Layout";

interface User {
  id?: number;
  role?: string;
  jmbg?: string;
  photoPath?: string;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getProfile();

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      setUser(response.data.data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <Layout title="Moj Profil">
        {loading && <div>Loading...</div>}
        {!loading && (
          <div className="ucenik-details-page">
            {error && <div>Error: {error}</div>}
            <div className="ucenik-details-card-left">
              <div className="row-container">
                <p style={{ margin: "0" }}>Ime i Prezime</p>
                <p style={{ margin: "0" }}>
                  {user.name} {user.surname}
                </p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Tip Korisnika</p>
                <p style={{ margin: "0" }}>{user.role}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>JMNG</p>
                <p style={{ margin: "0" }}>{user.jmbg}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Email</p>
                <p style={{ margin: "0" }}>{user.email}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Korisnicko ime</p>
                <p style={{ margin: "0" }}>{user.username}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Broj Logovanja</p>
                <p style={{ margin: "0" }}>{user.username}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Poslednji put ulogovan</p>
                <p style={{ margin: "0" }}>{user.username}</p>
              </div>
            </div>
            <div className="ucenik-details-card-right">
              <img className="image" src={user.photoPath} alt="Slika"></img>
              <div
                className="buttons-wrapper"
                style={{ marginLeft: "11rem", marginTop: "5rem" }}
              >
                <button className="button">Izmjeni Lozinku</button>
                <a href="/profile-edit" className="button">
                  Izmjeni Profil
                </a>
                <button className="button">Obrisi Profil</button>
              </div>
            </div>
          </div>
        )}
      </Layout>
      <style>
        {`
        .ucenik-details-page {
            display: flex;
            flex-direction: row;
        }
        .ucenik-details-card-right {
            display: flex;
            flex-direction: column;
        }
        .button {
            color: white;
            margin-left: 1rem;
            background-color: #444;
            border: none;
            cursor: pointer;
            text-shadow: 0px 0px 10px rgba(0,0,0,0.2);
            border-radius: 5px;
            padding: 0.3rem 0.6rem;
            text-decoration: none;
        }
        .row-container {
            margin: 2rem 0 2rem 1rem;
        }
        .image {
            width: 15rem;
            height: 15rem;
            margin: 6rem 0 0 15rem;
        }
          `}
      </style>
    </Fragment>
  );
};

export default Profile;
