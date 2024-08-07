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
      formData.append(
        "photoPath",
        "data:image/jpeg;base64,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"
      );
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
