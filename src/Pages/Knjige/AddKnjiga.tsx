import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import KnjigaForm from "./KnjigaForm";

const AddKnjiga: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout title="Add Knjiga">
      <div className="bottom-right">
        {submitted && <p>Submitted</p>}
        <KnjigaForm />
      </div>
    </Layout>
  );
};

export default AddKnjiga;
