import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";

interface Borrow {
  id: number;
  nazivKnjiga: string;
  izdanoUceniku: string;
  datumIzdavanja: string;
  trenutnoZadrzavanjeKnjige: string;
  knjiguIzdao: string;
}

const IzdavanjeKnjiga: React.FC = () => {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getIzdavanja();

      if (response.error) {
        setError(response.error);
      }

      if (response.data) {
        setBorrows(response.data);
      } else {
        setError("Failed to load data: " + response.error);
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
        <div className="grid-header">Izdato uceniku</div>
        <div className="grid-header">Datum izdavanja</div>
        <div className="grid-header">Trenutno zadrzavanje knjige</div>
        <div className="grid-header">Knjigu izdao</div>
        {borrows.map((borrow) => (
          <React.Fragment key={borrow.id}>
            <div className="grid-item">{borrow.nazivKnjiga}</div>
            <div className="grid-item">{borrow.izdanoUceniku}</div>
            <div className="grid-item">{borrow.datumIzdavanja}</div>
            <div className="grid-item">{borrow.trenutnoZadrzavanjeKnjige}</div>
            <div className="grid-item">{borrow.knjiguIzdao}</div>
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
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
        }
        .grid-header {
          font-weight: bold;
          border-bottom: 2px solid #ccc;
          padding: 0.5rem;
          text-align: center;
        }
        .grid-item {
          border-bottom: 1px solid #ccc;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
          .grid-header:nth-child(5),
          .grid-item:nth-child(5n + 5) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default IzdavanjeKnjiga;
