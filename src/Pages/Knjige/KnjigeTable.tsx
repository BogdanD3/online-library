import React, { useState, useEffect, useCallback } from "react";
import MoreBtn from "../../Components/Buttons/MoreBtn";
import { MenuProps, message } from "antd";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Shared/api";

interface Book {
  id: number;
  title: string;
  authors: { id: number; name: string; surname: string }[];
  categories: { id: number; name: string }[];
  samples: number;
  bSamples: number;
  rSamples: number;
  fSamples: number;
}

interface KnjigeTableProps {
  searchQuery: string;
}

const KnjigeTable: React.FC<KnjigeTableProps> = ({ searchQuery }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const renderMenuItems = (book: Book) => {
    var menuItems: MenuProps["items"] = [
      {
        icon: <i className="bi bi-eye" style={{ fontSize: "1rem" }}></i>,
        label: <p style={{ margin: "0" }}>Detalji</p>,
        key: "0",
        onClick: () => {
          console.log("View book with id:", book.id);
          navigate(`/knjiga/${book.id}`);
        },
      },
      {
        icon: (
          <i className="bi bi-pencil-square" style={{ fontSize: "1rem" }}></i>
        ),
        label: <p style={{ margin: "0" }}>Izmjeni</p>,
        key: "1",
        onClick: () => {
          console.log("Edit book with id:", book.id);
          navigate(`/knjiga/${book.id}/edit`);
        },
      },
      {
        icon: (
          <i
            className="bi bi-person-raised-hand"
            style={{ fontSize: "1rem" }}
          ></i>
        ),
        label: <p style={{ margin: "0" }}>Izdaj</p>,
        key: "2",
        onClick: () => {
          console.log("Borrow book with id:", book.id);
          navigate(`/izdaj-knjigu/${book.id}`);
        },
      },
      {
        icon: (
          <i
            className="bi bi-arrow-return-right"
            style={{ fontSize: "1rem" }}
          ></i>
        ),
        label: <p style={{ margin: "0" }}>Vrati</p>,
        key: "3",
        onClick: () => {
          console.log("Return book with id:", book.id);
          navigate(`/vrati-knjigu/${book.id}`);
        },
      },
      {
        icon: (
          <i className="bi bi-clipboard2-x" style={{ fontSize: "1rem" }}></i>
        ),
        label: <p style={{ margin: "0" }}>Otpisi</p>,
        key: "4",
        onClick: () => {
          console.log("Return book with id:", book.id);
          navigate(`/otpisi-knjigu/${book.id}`);
        },
      },
      {
        icon: <i className="bi bi-save-fill" style={{ fontSize: "1rem" }}></i>,
        label: <p style={{ margin: "0" }}>Rezervisi</p>,
        key: "5",
        onClick: () => {
          console.log("Reserve book with id:", book.id);
          navigate(`/rezervisi-knjigu/${book.id}`);
        },
      },
      {
        icon: <i className="bi bi-trash3" style={{ fontSize: "1rem" }}></i>,
        label: <p style={{ margin: "0" }}>Obrisi</p>,
        key: "6",
        onClick: () => {
          console.log("Delete book with id:", book.id);
          ApiService.deleteBook(book.id);
          message.success("Korisnik obrisan");
        },
      },
    ];

    return menuItems;
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getBooks(searchQuery);

      if (response.error) {
        setError(response.error);
      }

      if (Array.isArray(response.data?.data)) {
        setBooks(response.data.data);
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

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
            <div className="grid-item">{book.title}</div>
            <div className="grid-item">
              {book.authors.length > 0
                ? `${book.authors[0].name} ${book.authors[0].surname}`
                : "N/A"}
            </div>
            <div className="grid-item">
              {book.categories.map((category) => category.name).join(", ")}
            </div>
            <div className="grid-item">{book.samples}</div>
            <div className="grid-item">{book.rSamples}</div>
            <div className="grid-item">{book.bSamples}</div>
            <div className="grid-item">{book.fSamples}</div>
            <div className="grid-item">
              {book.samples + book.rSamples + book.bSamples + book.fSamples}
            </div>
            <div className="grid-item">
              <MoreBtn items={renderMenuItems(book)} />
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
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr) 5rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: auto;
  }

  .grid-header {
    font-weight: bold;
    border-bottom: 2px solid #ccc;
    padding: 0.75rem;
    text-align: center;
    background-color: #f4f4f4;
    text-transform: uppercase;
  }

  .grid-item {
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .user-photo {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .action-column {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    .grid-container {
      grid-template-columns: repeat(6, 1fr); 
    }
    .grid-header:nth-child(4),
    .grid-header:nth-child(5),
    .grid-header:nth-child(7) {
      display: none; 
    }
    .grid-item:nth-child(9n + 4),
    .grid-item:nth-child(9n + 5),
    .grid-item:nth-child(9n + 7) {
      display: none; 
    }
  }
  @media (max-width:
 768px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr); 
    }
    .grid-header:nth-child(2),
    .grid-header:nth-child(4),
    .grid-header:nth-child(5),
    .grid-header:nth-child(6),
    .grid-header:nth-child(7) {
      display: none; 
    }
    .grid-item:nth-child(9n + 2),
    .grid-item:nth-child(9n + 4),
    .grid-item:nth-child(9n + 5),
    .grid-item:nth-child(9n + 6),
    .grid-item:nth-child(9n + 7) {
      display: none; /* Hide items for columns 4, 5, 6, and 7 */
    }
  }
`}</style>
    </div>
  );
};

export default KnjigeTable;
