import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AutoriForm from "./AutoriForm";

const AddAutor: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout title="Add Autor">
      <div className="bottom-right">
        {submitted && <p>Submitted</p>}
        <AutoriForm />
      </div>
    </Layout>
  );
};

export default AddAutor;
