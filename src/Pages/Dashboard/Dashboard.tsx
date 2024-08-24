import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import ReservationsTable from "./ReservationsTable";
import Aktivnosti from "./AktivnostiTable";
import ChartsOverviewDemo from "../../Components/Chart";
import ApiService from "../../Shared/api";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [borrowedBooksCount, setBorrowedBooksCount] = useState<number>(0);
  const [reservedBooksCount, setReservedBooksCount] = useState<number>(0);
  const [overdueBooksCount, setOverdueBooksCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowResponse = await ApiService.getIzdavanja();
        if (borrowResponse.error) {
          throw new Error(borrowResponse.error);
        }
        const borrowedBooks = borrowResponse.data.data.izdate.length;
        const overdueBooks = borrowResponse.data.data.prekoracene.length;

        const reservationResponse = await ApiService.getReservations();
        if (reservationResponse.error) {
          throw new Error(reservationResponse.error);
        }
        const reservedBooks = reservationResponse.data.data.active.length;

        setBorrowedBooksCount(borrowedBooks);
        setReservedBooksCount(reservedBooks);
        setOverdueBooksCount(overdueBooks);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Layout title="Dashboard">
        <div className="dashboard-container">
          <div className="left-side">
            <h1>Aktivnosti</h1>
            <Aktivnosti />
          </div>
          <div className="right-side">
            <ReservationsTable />
            {loading && <div className="loading">Loading chart...</div>}
            {error && <div className="error">Error: {error}</div>}
            {!loading && !error && (
              <ChartsOverviewDemo
                borrowedBooks={borrowedBooksCount}
                reservedBooks={reservedBooksCount}
                overdueBooks={overdueBooksCount}
              />
            )}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Dashboard;
