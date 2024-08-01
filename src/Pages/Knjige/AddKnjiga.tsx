import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";

const AddKnjiga: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout title="Add Knjiga">
      <div className="bottom-right">{submitted && <p>Submitted</p>}</div>
    </Layout>
  );
};

export default AddKnjiga;
