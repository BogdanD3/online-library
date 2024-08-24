import React, { Fragment, useEffect, useState, useCallback } from "react";
import ApiService from "../../Shared/api";

interface Borrow {
  id: number;
  knjiga: {
    title: string;
  };
  student: {
    name: string;
    surname: string;
  };
  bibliotekar0: {
    name: string;
    surname: string;
    photoPath: string;
  };
  borrow_date: string;
  return_date: string;
  status: string;
}

const Aktivnosti: React.FC = () => {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getIzdavanja();

      if (response.error) {
        setError(response.error);
      } else if (response.data.data) {
        const allBorrows = [
          ...response.data.data.izdate,
          ...response.data.data.prekoracene,
          ...response.data.data.otpisane,
          ...response.data.data.vracene,
        ];

        const sortedBorrows = allBorrows.sort(
          (a, b) =>
            new Date(b.borrow_date).getTime() -
            new Date(a.borrow_date).getTime()
        );

        setBorrows(sortedBorrows);
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

  const getActionText = (status: string) => {
    switch (status) {
      case "Izdata":
        return "izdala knjigu";
      case "Prekoracena":
        return "izdala knjigu sa prekoracenjem";
      case "Otpisana":
        return "otpisala knjigu";
      case "Vracena":
        return "vratila knjigu";
      default:
        return "";
    }
  };

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

  const hasMoreItems = borrows.length > displayCount;

  return (
    <div className="aktivnosti-wrapper">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && (
        <div className="aktivnosti">
          {borrows.slice(0, displayCount).map((borrow) => (
            <Fragment key={borrow.id}>
              <div className="aktivnost">
                <img
                  src={borrow.bibliotekar0.photoPath}
                  alt=""
                  className="librarian-photo"
                />
                <p>
                  {borrow.bibliotekar0.name} {borrow.bibliotekar0.surname}{" "}
                  {getActionText(borrow.status)} "{borrow.knjiga.title}"
                  studentu {borrow.student.name} {borrow.student.surname}
                  dana {new Date(borrow.borrow_date).toLocaleDateString()}.
                </p>
              </div>
            </Fragment>
          ))}
          {hasMoreItems && (
            <div className="show-more-wrapper">
              <button className="show-more-button" onClick={handleShowMore}>
                Show More
              </button>
            </div>
          )}
        </div>
      )}
      <style>{`
        .aktivnosti-wrapper {
          padding: 2rem;
        }
        .loading, .error {
          font-size: 1.5rem;
          margin: 2rem 0;
          text-align: center;
        }
        .aktivnosti {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .aktivnost {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .librarian-photo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        p {
          margin: 0;
          font-size: 1.1rem;
        }
        .show-more-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }
        .show-more-button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: #1890ff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .show-more-button:hover {
          background-color: #40a9ff;
        }
      `}</style>
    </div>
  );
};

export default Aktivnosti;
