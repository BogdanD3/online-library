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
      Authorization: "Bearer 2919|90b48xI4cMhDaAPlo1Avc0bVjgFPxYmrwcPWZe2Y",
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
      <div className="first-card reservation-card reservation-details">
        <h2>Naziv knjige</h2>
        <p>Datum rezervacije</p>
        <p>Rezervacija istice</p>
        <p>Rezervaciju podnio</p>
        <p style={{ marginRight: "3rem" }}>Status</p>
      </div>
      <div className="reservations-table">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <div className="reservation-info">
              <h3 style={{ marginRight: "1.5rem" }}>
                {reservation.knjiga.title || "No Title"}
              </h3>
              <p>{reservation.action_date || "N/A"}</p>
              <p style={{ marginRight: "3rem" }}>
                {/* Logika za expiery date */}Lorem ipsum
              </p>
              <p style={{ marginRight: "1rem" }}>
                {reservation.bibliotekar0.name || "No Name"}{" "}
                {reservation.bibliotekar0.surname || "No Surname"}
              </p>
              <p style={{ marginRight: "-2rem" }}>
                {reservation.status || "N/A"}
              </p>
              <MoreOutlined className="dots" style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
        ))}
      </div>
      <style>{`
            .wrapper {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: 3rem;
            }
            .reservations-table {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 50rem;
            }
            .reservation-card {
              display: flex;
              flex-direction: row;
              align-items: center;
              border: 1px solid #ccc;
              padding: 1rem;
              width: 100%;
              max-width: 50rem;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .reservation-info {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              margin-left: 2.5rem;
            }
            .reservation-details {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .dots {   
              cursor: pointer;
              margin: 0;
            }
          `}</style>
    </div>
  );
};

export default ReservationsTable;
