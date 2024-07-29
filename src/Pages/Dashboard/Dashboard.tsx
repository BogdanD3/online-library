import React, { Fragment, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import ReservationsTable from "./ReservationsTable";

const Dashboard: React.FC = () => {
  return (
    <Fragment>
      <Layout title="Dashboard">
        <div className="bottom-right" style={{ height: "100%" }}>
          <ReservationsTable />
        </div>
      </Layout>
    </Fragment>
  );
};

export default Dashboard;
