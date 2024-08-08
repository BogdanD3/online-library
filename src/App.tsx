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
import Knjige from "./Pages/Knjige/Knjige";
import PrivateRoute from "./Components/PrivateRoute"; // Make sure to adjust the path as needed
import ApiService from "./Shared/api";
import BibliotekarDetails from "./Pages/Bibliotekari/BibliotekarDetails";

const App: React.FC = () => {
  // initialize ApiClient
  ApiService.init();
  ApiService.setHeader();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route
          path="bibliotekari"
          element={<PrivateRoute element={<Bibliotekari />} />}
        />
        <Route
          path="bibliotekari/add-bibliotekar"
          element={<PrivateRoute element={<AddBibliotekar />} />}
        />
        <Route path="autori" element={<PrivateRoute element={<Autori />} />} />
        <Route path="autori/add-autor" element={<AddAutor />} />
        <Route path="ucenici" element={<Ucenici />} />
        <Route path="/knjige" element={<Knjige />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="bibliotekari/:id"
          element={<PrivateRoute element={<BibliotekarDetails />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
