import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import BibliotekarForm from "./BibliotekariForm";

const AddBibliotekar: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout title="Add Bibliotekar">
      <div className="bottom-right">
        {submitted && <p>Submitted</p>}
        <BibliotekarForm />
      </div>
    </Layout>
  );
};

export default AddBibliotekar;
