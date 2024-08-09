import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import { Col, Row } from "antd";
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

const UcenikDetails: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getLibrarian(id);

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
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <Layout title="Ucenik">
        <div className="ucenik-details-page">
          {error && <div>Error: {error}</div>}
          {loading && <div>Loading...</div>}
          <div className="ucenik-details-card">
            <div className="rows-container">
              <Row className="row">
                <Col span={6}>
                  <img
                    src={user.photoPath || "https://via.placeholder.com/100"}
                    alt="User"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  Korisničko ime:
                </Col>
                <Col span={18}>{user.username}</Col>
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  Ime i prezime:
                </Col>
                <Col span={18}>
                  {user.name} {user.surname}
                </Col>
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  Email:
                </Col>
                <Col span={18}>{user.email}</Col>
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  JMBG:
                </Col>
                <Col span={18}>{user.jmbg}</Col>
              </Row>
            </div>
          </div>
        </div>
      </Layout>
      <style>
        {`
            .ucenik-details-page {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: rgb(210, 248, 249);
            }

            .ucenik-details-card {
              width: 30rem;
              padding: 1.7rem;
              background-color: rgba(178, 237, 239, 0.881);
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
            }

            .ucenik-details-card .rows-container {
              width: 100%;
            }

            .ucenik-details-card .rows-container .row {
              margin-bottom: 1rem;
            }

            .ucenik-details-card .rows-container .col-title {
              font-weight: bold;
            }
          `}
      </style>
    </Fragment>
  );
};

export default UcenikDetails;
