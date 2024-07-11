import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormComponent.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "../../Components/Buttons/FormBtn";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  picture: File | null;
}

interface FormComponentProps {
  onSubmit: (formData: FormData) => void;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  picture: null,
};

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

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
        validatePasswordMatch(name, value);
      }
    }
  };

  const validatePasswordMatch = (name: string, value: string) => {
    if (name === "password") {
      setPasswordMatchError(
        formData.confirmPassword !== value ? "Passwords do not match" : null
      );
    } else if (name === "confirmPassword") {
      setPasswordMatchError(
        formData.password !== value ? "Passwords do not match" : null
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords must match");
    } else {
      onSubmit(formData);
      clearForm();
      navigate("/bibliotekari");
    }
  };

  const clearForm = () => {
    setFormData(initialFormData);
    setPasswordMatchError(null);
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
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
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
      <div className="form-rigth-side">
        <div className="form-group">
          <label htmlFor="picture">Profile Picture:</label>
          <i className="bi bi-image" onClick={handleIconClick}></i>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="submit-clear">
        <Button type="submit" className="submit-button">
          Submit <i className="bi bi-check"></i>
        </Button>
        <Button type="button" onClick={clearForm} className="clear-button">
          Clear <i className="bi bi-x"></i>
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;
