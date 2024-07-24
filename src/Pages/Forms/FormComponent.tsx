import React, { useState } from "react";
import "./FormComponent.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "../../Components/Buttons/FormBtn";

export interface BibliotekarFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  picture: File | null;
}

interface FormComponentProps {
  onSubmit: (formData: BibliotekarFormData) => void;
  passwordValidation?: (formData: BibliotekarFormData) => string | null;
}

const initialFormData: BibliotekarFormData = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  picture: null,
};

const FormComponent: React.FC<FormComponentProps> = ({
  onSubmit,
  passwordValidation,
}) => {
  const [formData, setFormData] =
    useState<BibliotekarFormData>(initialFormData);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );

  const handleIconClick = () => {
    const fileInput = document.getElementById("picture");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "password" || name === "confirmPassword") {
        validatePasswordMatch();
      }
    }
  };

  const validatePasswordMatch = () => {
    if (passwordValidation) {
      setPasswordMatchError(passwordValidation(formData));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordValidation && passwordValidation(formData)) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-left-side">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {passwordMatchError && (
          <div className="password-match-error">{passwordMatchError}</div>
        )}
      </div>
      <div className="form-group add-image">
        <i
          className="bi bi-image"
          style={{ fontSize: "1.5rem", zIndex: "1" }}
          onClick={handleIconClick}
        >
          Add Picture
        </i>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />

        <div className="submit-clear">
          <Button type="submit" className="submit-button">
            Save
            <i className="bi bi-check" style={{ fontSize: "1.3rem" }}></i>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormComponent;
