import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import FormComponent, { FormData } from "./Forms/FormComponent";

const AddBibliotekar: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (formData: FormData) => {
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <Layout title="Add Bibliotekar">
      <div className="bottom-right">
        {submitted && <p>Submitted</p>}
        <FormComponent onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default AddBibliotekar;
