import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import Layout from "../../Components/Layout/Layout";

interface Author {
  name: string;
  surname: string;
}

interface Category {
  name: string;
}

interface Genre {
  name: string;
}

interface Publisher {
  name: string;
}

interface Book {
  title: string;
  categories: Category[];
  genres: Genre[];
  authors: Author[];
  publisher: Publisher;
  pDate: string;
}

const KnjigaDetails: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getBook(id);

      if (response.error) {
        setError(response.error);
        return;
      }

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
    <Layout title="Book Details">
      <div className="book-details-page">
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {book && (
          <div className="book-details-card">
            <div className="detail-item">
              <p className="detail-label">Naziv knjige:</p>
              <p>{book.title}</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Kategorija:</p>
              <p>{book.categories?.map((cat) => cat.name).join(", ")}</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Zanr:</p>
              <p>{book.genres?.map((genre) => genre.name).join(", ")}</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Autor/ri:</p>
              <p>
                {book.authors
                  ?.map((author) => `${author.name} ${author.surname}`)
                  .join(", ")}
              </p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Izdavac:</p>
              <p>{book.publisher?.name}</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Godina izdavanja:</p>
              <p>{book.pDate}</p>
            </div>
          </div>
        )}
      </div>
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

          .detail-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
          }

          .detail-label {
            font-weight: bold;
            margin-right: 1rem;
          }
        `}
      </style>
    </Layout>
  );
};

export default KnjigaDetails;
