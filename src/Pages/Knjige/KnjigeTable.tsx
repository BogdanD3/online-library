import React, { useState, useEffect, useCallback } from "react";
import { MoreOutlined } from "@ant-design/icons";

interface Author {
  id: number;
  name: string;
  surname: string;
}

interface Category {
  id: number;
  name: string;
}

interface Picture {
  id: number;
  path: string;
  cover: number;
}

interface Book {
  id: number;
  title: string;
  photo: string;
  pictures: Picture[];
  authors: Author[];
  categories: Category[];
  ableToBorrow: boolean;
  ableToReserve: boolean;
  samples: number;
  bSamples: number;
  rSamples: number;
  fSamples: number;
}

interface BookTableProps {
  searchQuery: string;
}

const KnjigeTable: React.FC<BookTableProps> = ({ searchQuery }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiEndpoint = "https://biblioteka.simonovicp.com/api/books";

  const fetchData = useCallback(async (retryCount = 0) => {
    const maxRetries = 5;
    const retryDelay = 1000 * Math.pow(2, retryCount);

    const headers = {
      Authorization: "Bearer 3150|Ir4VqM3VedMBRljNf4E9sJxcwJ6mqVIfa30EgjmC",
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers,
      });

      if (response.status === 429) {
        if (retryCount < maxRetries) {
          console.warn(
            `Rate limit exceeded, retrying in ${retryDelay / 1000} seconds...`
          );
          setTimeout(() => fetchData(retryCount + 1), retryDelay);
          return;
        } else {
          throw new Error(
            "Too many requests, exceeded maximum retry attempts."
          );
        }
      }

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (Array.isArray(result.data)) {
        setBooks(result.data);
      } else {
        console.error("API response did not contain expected data:", result);
        setError("Failed to load data");
      }
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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="grid-container">
        <div className="grid-header">Slika</div>
        <div className="grid-header">Naziv knjige</div>
        <div className="grid-header">Autor</div>
        <div className="grid-header">Kategorija</div>
        <div className="grid-header">Na raspolaganju</div>
        <div className="grid-header">Rezervisano</div>
        <div className="grid-header">Izdato</div>
        <div className="grid-header">U prekoracenju</div>
        <div className="grid-header">Ukupna kolicina</div>
        <div className="grid-header"></div>
        {filteredBooks.map((book) => (
          <React.Fragment key={book.id}>
            <div className="grid-item">
              <img
                src={
                  book.pictures.find((pic) => pic.cover === 1)?.path ||
                  book.photo ||
                  "https://via.placeholder.com/100"
                }
                alt={book.title}
                className="book-photo"
              />
            </div>
            <div className="grid-item">{book.title}</div>
            <div className="grid-item">
              {book.authors
                .map((author) => `${author.name} ${author.surname}`)
                .join(", ")}
            </div>
            <div className="grid-item">
              {book.categories.map((category) => category.name).join(", ")}
            </div>
            <div className="grid-item">{book.ableToBorrow ? "Da" : "Ne"}</div>
            <div className="grid-item">{book.fSamples}</div>
            <div className="grid-item">{book.bSamples}</div>
            <div className="grid-item">{book.rSamples}</div>
            <div className="grid-item">{book.samples}</div>
            <div className="grid-item">
              <MoreOutlined className="dots" style={{ fontSize: "1.5rem" }} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <style>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 3rem;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          width: 80%;
          gap: 0.5rem;
        }
        .grid-header {
          font-weight: bold;
          border-bottom: 2px solid #ccc;
          padding: 0.5rem;
        }
        .grid-item {
          border-bottom: 1px solid #ccc;
          padding: 0.5rem;
        }
        .book-photo {
          width: 3rem;
          height: 3rem;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default KnjigeTable;
