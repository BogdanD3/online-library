import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BibliotekarForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !surname ||
      !username ||
      !jmbg ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill out all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (jmbg.length < 13) {
      setError("JMBG must be at least 13 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("role_id", "1");
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("username", username);
    formData.append("jmbg", jmbg);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);

    if (picture) {
      formData.append("photoPath", URL.createObjectURL(picture));
    } else {
      formData.append("photoPath", "http://library.test/img/profile.jpg");
    }

    const token = "2031|kwS1XIzZQT94d9VRldypWYBAWjKkOU2Oe6LyTpGe";

    if (!token) {
      setError("Authentication token not found");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://biblioteka.simonovicp.com/api/users/store",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        setError(text || "Failed to create bibliotekar");
        return;
      }

      const result = await response.json();
      if (result.success) {
        navigate("/bibliotekari");
      } else {
        setError(result.message || "Failed to create bibliotekar");
      }
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setName("");
    setSurname("");
    setUsername("");
    setJmbg("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPicture(null);
    setError(null);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="JMBG"
          value={jmbg}
          onChange={(e) => setJmbg(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setPicture(e.target.files ? e.target.files[0] : null)
          }
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Submit"}
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default BibliotekarForm;
