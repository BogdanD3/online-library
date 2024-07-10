import React, { Fragment, useState } from "react";
import Header from "../Components/Layout/Header/Header";
import SideMenu from "../Components/Layout/Sidemenu/Sidemenu";
import Title from "../Components/Layout/Title/Title";
import FormComponent, { FormData } from "./Forms/FormComponent";

const AddBibliotekar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (formData: FormData) => {
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <Fragment>
      <div>
        <Header />
      </div>
      <div className="layout">
        <div className="Sidemenu">
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="Title">
          <Title isOpen={isOpen} title="Add Bibliotekar" />
          <FormComponent onSubmit={handleSubmit} />
          {submitted && <p>Submitted</p>}
        </div>
      </div>
    </Fragment>
  );
};

export default AddBibliotekar;
