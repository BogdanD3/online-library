import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import { Col, Row } from "antd";
import Layout from "../../Components/Layout/Layout";

interface Book {
  id: number;
  title: string;
  description: string;
}

interface User {
  id?: number;
  name?: string;
  surname?: string;
  books?: Book[];
}

const AutorDetails: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getAuthor(id);

      if (response.error) {
        setError(response.error);
        return;
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
      <Layout title="Autor">
        <div className="autor-details-page">
          {error && <div>Error: {error}</div>}
          {loading && <div>Loading...</div>}
          <div className="autor-details-card">
            <div className="rows-container">
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
                  Knjige:
                </Col>
                <Col span={18}>
                  {user.books?.map((book) => (
                    <div key={book.id} className="book">
                      <div className="book-details">
                        <h3>{book.title}</h3>
                        <p>{book.description}</p>
                      </div>
                    </div>
                  ))}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Layout>
      <style>
        {`
            .autor-details-page {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: rgb(210, 248, 249);
            }

            .autor-details-card {
              width: 30rem;
              padding: 1.7rem;
              background-color: rgba(178, 237, 239, 0.881);
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
            }

            .autor-details-card .rows-container {
              width: 100%;
            }

            .autor-details-card .rows-container .row {
              margin-bottom: 1rem;
            }

            .autor-details-card .rows-container .col-title {
              font-weight: bold;
            }

            .book {
              display: flex;
              align-items: center;
              margin-bottom: 1rem;
            }

            .book-photo {
              width: 3rem;
              height: 3rem;
              border-radius: 5px;
              margin-right: 1rem;
            }

            .book-details {
              display: flex;
              flex-direction: column;
            }

            .book-details h3 {
              margin: 0;
            }

            .book-details p {
              margin: 0.2rem 0 0 0;
            }
          `}
      </style>
    </Fragment>
  );
};

export default AutorDetails;
