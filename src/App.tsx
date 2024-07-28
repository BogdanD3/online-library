import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddBibliotekar from "./Pages/Bibliotekari/AddBibliotekar";
import Bibliotekari from "./Pages/Bibliotekari/Bibliotekari";
import SignInPage from "./Pages/SignIn/SignIn";
import Ucenici from "./Pages/Ucenici/Ucenici";
import RegisterPage from "./Pages/Register/Register";
import AddAutor from "./Pages/Autori/AddAutor";
import Autori from "./Pages/Autori/Autori";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="bibliotekari" element={<Bibliotekari />} />
        <Route
          path="bibliotekari/add-bibliotekar"
          element={<AddBibliotekar />}
        />
        <Route path="autori" element={<Autori />} />
        <Route
          path="autori/add-autor"
          element={<AddAutor />}
        />
        <Route path="ucenici" element={<Ucenici />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
