import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Shared/api";
import Layout from "../../Components/Layout/Layout";
import { message, Modal } from "antd";

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

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getProfile();

      if (response.error) {
        setError(response.error);
      }

      setUser(response.data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteLibrarian = async () => {
    Modal.confirm({
      title: "Are you sure you want to delete your profile?",
      content: "This action cannot be undone.",
      okText: "Yes, delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await ApiService.deleteLibrarian(user.id);
          message.success("Profile deleted successfully.");
          navigate("/login"); // Redirect to login or another page after deletion
        } catch (error) {
          message.error("There was an issue deleting your profile.");
        }
      },
    });
  };

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
                <button
                  onClick={() => navigate("/profile-edit")}
                  className="button"
                >
                  Izmjeni Profil
                </button>
                <button className="button" onClick={deleteLibrarian}>
                  Obrisi Profil
                </button>
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
