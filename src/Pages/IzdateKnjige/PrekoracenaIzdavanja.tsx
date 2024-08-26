import React, { Fragment, useEffect, useState, useCallback } from "react";
import Layout from "../../Components/Layout/Layout";
import MiniMenu from "../../Components/MiniMenu";
import ApiService from "../../Shared/api"; // Assuming ApiService is correctly set up

interface Borrow {
  id: number;
  knjiga: {
    title: string;
  };
  bibliotekar0: {
    name: string;
    surname: string;
  };
  borrow_date: string;
  return_date: string;
}

const PrekoracenaIzdavanja: React.FC = () => {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getIzdavanja();

      if (response.error) {
        setError(response.error);
      } else if (response.data.data && response.data.data.prekoracene) {
        setBorrows(response.data.data.izdate);
      } else {
        setError("Failed to load data.");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateDaysBorrowed = (borrowDate: string, returnDate: string) => {
    const borrowDateObj = new Date(borrowDate);
    const returnDateObj = new Date(returnDate);
    const timeDiff = returnDateObj.getTime() - borrowDateObj.getTime();
    return Math.abs(Math.ceil(timeDiff / (1000 * 3600 * 24)));
  };

  return (
    <Layout title="Knjige U Prekoracenju">
      <div className="wrapper">
        <MiniMenu />
        <div className="content">
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && (
            <div className="grid-container">
              <div className="grid-header">Naziv knjige</div>
              <div className="grid-header">Izdato uceniku</div>
              <div className="grid-header">Datum izdavanja</div>
              <div className="grid-header">Trenutno zadrzavanje knjige</div>
              <div className="grid-header">Knjigu izdao</div>
              {borrows.map((borrow) => (
                <Fragment key={borrow.id}>
                  <div className="grid-item">{borrow.knjiga.title}</div>
                  <div className="grid-item">{borrow.borrow_date}</div>
                  <div className="grid-item">{borrow.return_date}</div>
                  <div className="grid-item">
                    {calculateDaysBorrowed(
                      borrow.borrow_date,
                      new Date().toISOString()
                    )}{" "}
                    dana
                  </div>
                  <div className="grid-item">
                    {borrow.bibliotekar0.name} {borrow.bibliotekar0.surname}
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
  .wrapper {
    display: flex;
    flex-direction: row;
  }

  .content {
    margin-top: 2rem;
    margin-left: 5rem;
    margin-right: 3rem;
    width: 100%;
  }

  .loading, .error {
    font-size: 1.5rem;
    margin: 2rem 0;
    text-align: center;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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
    padding: 0.75rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
    }

    .grid-header:nth-child(5),
    .grid-item:nth-child(5n + 5) {
      display: none;
    }
  }

  @media (max-width: 576px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
    }

    .grid-header:nth-child(4),
    .grid-item:nth-child(4n + 4) {
      display: none;
    }

    .grid-header:nth-child(5),
    .grid-item:nth-child(5n + 5) {
      grid-column: span 2;
    }
  }
`}</style>
    </Layout>
  );
};

export default PrekoracenaIzdavanja;
