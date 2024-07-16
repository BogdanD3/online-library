import React, { Fragment } from "react";
import Layout from "../Components/Layout/Layout";

const Dashboard: React.FC = () => {
  return (
    <Fragment>
      <Layout title="Dashboard">
        <div className="Content" style={{ height: "100%" }}>
          <p>This is the main content of the dashboard.</p>
          <p style={{ marginTop: "40rem" }}>a</p>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Dashboard;
