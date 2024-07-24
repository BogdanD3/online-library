import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import FormComponent, { BibliotekarFormData } from "../Forms/FormComponent";
import BibliotekariForm from "./BibliotekariForm";

const AddBibliotekar: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (formData: BibliotekarFormData) => {
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <Layout title="Add Bibliotekar">
      <div className="bottom-right">
        {submitted && <p>Submitted</p>}
        <BibliotekariForm />
      </div>
    </Layout>
  );
};

export default AddBibliotekar;
