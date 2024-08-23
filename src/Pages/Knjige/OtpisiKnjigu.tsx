import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { message } from "antd"; // Import the message component from antd
import ApiService from "../../Shared/api";
import Layout from "../../Components/Layout/Layout";

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
  return_date: string | null;
}

const OtpisiKnjigu: React.FC = () => {
  const [bookTitle, setBookTitle] = useState<string | null>(null);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBorrows, setSelectedBorrows] = useState<Set<number>>(
    new Set()
  );
  const { id } = useParams<{ id: string }>();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.getIzdavanja();

      if (response.error) {
        throw new Error(response.error);
      }

      const bookResponse = await ApiService.getBook(id);
      if (bookResponse.error) {
        throw new Error(bookResponse.error);
      }

      setBookTitle(bookResponse.data.data.title);
      setBorrows(response.data.data.izdate);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateDuration = (borrowDate: string, returnDate: string | null) => {
    const start = new Date(borrowDate).getTime();
    const end = returnDate ? new Date(returnDate).getTime() : Date.now();
    const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return `${durationInDays} days`;
  };

  const calculateOverdue = (borrowDate: string, returnDate: string | null) => {
    const today = new Date().getTime();
    const end = returnDate ? new Date(returnDate).getTime() : today;
    const overdueDays =
      end > today ? 0 : Math.ceil((today - end) / (1000 * 60 * 60 * 24));
    return overdueDays > 0 ? `${overdueDays} days` : "Nije u Prekorečenju";
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedBorrows((prevSelectedBorrows) => {
      const newSelectedBorrows = new Set(prevSelectedBorrows);
      if (newSelectedBorrows.has(id)) {
        newSelectedBorrows.delete(id);
      } else {
        newSelectedBorrows.add(id);
      }
      return newSelectedBorrows;
    });
  };

  const handleWriteOffBooks = async () => {
    const toWriteoff = Array.from(selectedBorrows);

    try {
      const response = await ApiService.WriteOffBook({ toWriteoff });

      if (response.error) {
        throw new Error(response.error);
      }

      message.success("Knjige su uspješno otpisane!");
      setSelectedBorrows(new Set());
      fetchData();
    } catch (error: any) {
      console.error("Error writing off books:", error);
      message.error("Failed to write off books. Please try again.");
    }
  };

  const filteredBorrows = borrows.filter(
    (borrow) => borrow.knjiga.title === bookTitle
  );

  return (
    <Layout title={bookTitle || "Otpisi Knjigu"}>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {!loading && !error && filteredBorrows.length > 0 && (
          <>
            <table className="borrow-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Izdato učeniku</th>
                  <th>Datum izdavanja</th>
                  <th>Trenutno zadržavanje knjige</th>
                  <th>Prekoračenje u danima</th>
                  <th>Knjigu izdao</th>
                </tr>
              </thead>
              <tbody>
                {filteredBorrows.map((borrow) => (
                  <tr key={borrow.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBorrows.has(borrow.id)}
                        onChange={() => handleCheckboxChange(borrow.id)}
                      />
                    </td>
                    <td>{borrow.knjiga.title || "N/A"}</td>
                    <td>{new Date(borrow.borrow_date).toLocaleDateString()}</td>
                    <td>
                      {calculateDuration(
                        borrow.borrow_date,
                        borrow.return_date
                      )}
                    </td>
                    <td>
                      {calculateOverdue(borrow.borrow_date, borrow.return_date)}
                    </td>
                    <td>
                      {borrow.bibliotekar0?.name || "Unknown"}{" "}
                      {borrow.bibliotekar0?.surname || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleWriteOffBooks}
              disabled={selectedBorrows.size === 0}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor:
                  selectedBorrows.size === 0 ? "#ccc" : "#4CAF50",
                color: "#fff",
                border: "none",
                cursor: selectedBorrows.size === 0 ? "not-allowed" : "pointer",
              }}
            >
              Otpisi Knjigu
            </button>
          </>
        )}
        {!loading && !error && filteredBorrows.length === 0 && (
          <div>No data available.</div>
        )}
      </div>
      <style>{`
        .borrow-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .borrow-table th, .borrow-table td {
          border: 1px solid #ccc;
          padding: 0.75rem;
          text-align: center;
        }
        .borrow-table th {
          background-color: #f4f4f4;
          font-weight: bold;
        }
        .borrow-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        input[type="checkbox"] {
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
};

export default OtpisiKnjigu;
