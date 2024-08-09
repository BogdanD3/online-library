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
import BibliotekarEdit from "./Pages/Bibliotekari/BibliotekarEdit";
import Settings from "./Pages/Settings/Settings";
import UcenikDetails from "./Pages/Ucenici/UcenikDetails";
import UcenikEdit from "./Pages/Ucenici/UcenikEdit";
import AutorDetails from "./Pages/Autori/AutoriDetails";
import AutorEdit from "./Pages/Autori/AutoriEdit";
import KnjigaDetails from "./Pages/Knjige/KnjigaDetails";
import KnjigaEdit from "./Pages/Knjige/KnjigaEdit";

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
        <Route path="settings" element={<Settings />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/bibliotekar/:id"
          element={<PrivateRoute element={<BibliotekarDetails />} />}
        />
        <Route
          path="/bibliotekar/:id/edit"
          element={<PrivateRoute element={<BibliotekarEdit />} />}
        />
        <Route
          path="/ucenic/:id"
          element={<PrivateRoute element={<UcenikDetails />} />}
        />
        <Route
          path="/ucenic/:id/edit"
          element={<PrivateRoute element={<UcenikEdit />} />}
        />
        <Route
          path="/autor/:id"
          element={<PrivateRoute element={<AutorDetails />} />}
        />
        <Route
          path="/autor/:id/edit"
          element={<PrivateRoute element={<AutorEdit />} />}
        />
        <Route
          path="/knjiga/:id"
          element={<PrivateRoute element={<KnjigaDetails />} />}
        />
        <Route
          path="/knjiga/:id/edit"
          element={<PrivateRoute element={<KnjigaEdit />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
