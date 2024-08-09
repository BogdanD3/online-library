import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import { Col, Row } from "antd";
import Layout from "../../Components/Layout/Layout";

interface Category {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Publisher {
  id: number;
  name: string;
}

interface Script {
  id: number;
  name: string;
}

interface Language {
  id: number;
  name: string;
}

interface Bookbind {
  id: number;
  name: string;
}

interface BookFormat {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  photo: string;
  description: string;
  rating: string;
  pages: number;
  pDate: string;
  isbn: string;
  samples: number;
  bSamples: number;
  rSamples: number;
  fSamples: number;
  ableToBorrow: boolean;
  ableToReserve: boolean;
  categories: Category[];
  genres: Genre[];
  publisher: Publisher;
  script: Script;
  language: Language;
  bookbind: Bookbind;
  format: BookFormat;
  pictures: { id: number; path: string; cover: number }[];
}

const KnjigaDetails: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getBook(id);

      if (response.error) {
        setError(response.error);
        return;
      }

      console.log("API Response:", response);

      if (response.data) {
        setBook(response.data);
      } else {
        setError("No data found");
      }
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
      <Layout title="Book Details">
        <div className="book-details-page">
          {error && <div>Error: {error}</div>}
          {loading && <div>Loading...</div>}
          {book && (
            <div className="book-details-card">
              <div className="rows-container">
                <Row className="row">
                  <Col span={6}>
                    <img
                      src={book.photo || "https://via.placeholder.com/100"}
                      alt={book.title}
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
                    Title:
                  </Col>
                  <Col span={18}>{book.title}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Description:
                  </Col>
                  <Col span={18}>{book.description}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Rating:
                  </Col>
                  <Col span={18}>{book.rating}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Pages:
                  </Col>
                  <Col span={18}>{book.pages}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Publication Date:
                  </Col>
                  <Col span={18}>{book.pDate}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    ISBN:
                  </Col>
                  <Col span={18}>{book.isbn}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Samples:
                  </Col>
                  <Col span={18}>{book.samples}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Borrowable:
                  </Col>
                  <Col span={18}>{book.ableToBorrow ? "Yes" : "No"}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Reserves:
                  </Col>
                  <Col span={18}>{book.ableToReserve ? "Yes" : "No"}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Publisher:
                  </Col>
                  <Col span={18}>{book.publisher?.name || "N/A"}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Script:
                  </Col>
                  <Col span={18}>{book.script?.name || "N/A"}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Language:
                  </Col>
                  <Col span={18}>{book.language?.name || "N/A"}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Bookbind:
                  </Col>
                  <Col span={18}>{book.bookbind?.name || "N/A"}</Col>
                </Row>
                <Row className="row">
                  <Col span={6} className="col-title">
                    Format:
                  </Col>
                  <Col span={18}>{book.format?.name || "N/A"}</Col>
                </Row>
              </div>
            </div>
          )}
        </div>
      </Layout>
      <style>
        {`
            .book-details-page {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: rgb(210, 248, 249);
            }

            .book-details-card {
              width: 30rem;
              padding: 1.7rem;
              background-color: rgba(178, 237, 239, 0.881);
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
            }

            .book-details-card .rows-container {
              width: 100%;
            }

            .book-details-card .rows-container .row {
              margin-bottom: 1rem;
            }

            .book-details-card .rows-container .col-title {
              font-weight: bold;
            }
          `}
      </style>
    </Fragment>
  );
};

export default KnjigaDetails;
