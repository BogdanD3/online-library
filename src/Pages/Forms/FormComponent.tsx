import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormComponent.css";
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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    clearForm();
    navigate("/bibliotekari");
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="form-group">
        <label htmlFor="picture">Profile Picture:</label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="submit-button">
        Submit
      </Button>
      <Button type="button" onClick={clearForm} className="clear-button">
        Clear
      </Button>
    </form>
  );
};

export default FormComponent;
