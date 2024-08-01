import React, { useState, useEffect, useCallback } from "react";
import { MoreOutlined } from "@ant-design/icons";

interface Reservation {
  id: number;
  knjiga: {
    title: string;
  };
  bibliotekar0: {
    name: string;
    surname: string;
  };
  action_date: string;
  status: string;
}

const ReservationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiEndpoint =
    "https://biblioteka.simonovicp.com/api/books/reservations";

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
        // Too Many Requests
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

      if (result.data && result.data.active) {
        setReservations(result.data.active);
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
        <div className="grid-header">Datum rezervacije</div>
        <div className="grid-header">Rezervacija istice</div>
        <div className="grid-header">Rezervaciju podnio</div>
        <div className="grid-header">Status</div>
        <div className="grid-header"></div>
        {reservations.map((reservation) => (
          <React.Fragment key={reservation.id}>
            <div className="grid-item">
              {reservation.knjiga.title || "No Title"}
            </div>
            <div className="grid-item">{reservation.action_date || "N/A"}</div>
            <div className="grid-item">Lorem ipsum</div>{" "}
            {/* Placeholder for expiry date logic */}
            <div className="grid-item">
              {reservation.bibliotekar0.name || "No Name"}{" "}
              {reservation.bibliotekar0.surname || "No Surname"}
            </div>
            <div className="grid-item">{reservation.status || "N/A"}</div>
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
          grid-template-columns: auto auto auto auto auto auto;
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
        .dots {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ReservationsTable;
