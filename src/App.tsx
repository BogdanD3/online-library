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
import UceniciForm from "./Pages/Ucenici/AddUcenik";
import AddKnjiga from "./Pages/Knjige/AddKnjiga";
import Profile from "./Pages/MeProfile/Profile";
import ProfileEdit from "./Pages/MeProfile/ProfileEdit";
import IzdavanjeKnjiga from "./Pages/IzdateKnjige/IzdavanjeKnjiga";
import RezervacijeKnjiga from "./Pages/IzdateKnjige/RezervacijeKnjiga";
import ArhiviraneRezervacije from "./Pages/IzdateKnjige/ArhiviraneRezervacije";
import PrekoracenaIzdavanja from "./Pages/IzdateKnjige/PrekoracenaIzdavanja";
import IzdajKnjigu from "./Pages/Knjige/IzdajKnjigu";
import VratiKnjigu from "./Pages/Knjige/VratiKnjigu";
import RezervisiKnjigu from "./Pages/Knjige/RezervisiKnjigu";

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
        <Route path="ucenici/add-ucenik" element={<UceniciForm />} />
        <Route path="/knjige" element={<Knjige />} />
        <Route path="/knjige/add-knjiga" element={<AddKnjiga />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile-edit" element={<ProfileEdit />} />
        <Route path="settings" element={<Settings />} />
        <Route path="izdavanje" element={<IzdavanjeKnjiga />} />
        <Route path="rezervacije" element={<RezervacijeKnjiga />} />
        <Route path="izdaj-knjigu/:id" element={<IzdajKnjigu />} />
        <Route path="vrati-knjigu/:id" element={<VratiKnjigu />} />
        <Route path="rezervisi-knjigu/:id" element={<RezervisiKnjigu />} />
        <Route
          path="arhivirane-rezervacije"
          element={<ArhiviraneRezervacije />}
        />
        <Route
          path="prekoracena-izdavanja"
          element={<PrekoracenaIzdavanja />}
        />
        <Route path="vracene-knjige" element={<PrekoracenaIzdavanja />} />

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
          path="/ucenik/:id"
          element={<PrivateRoute element={<UcenikDetails />} />}
        />
        <Route
          path="/ucenik/:id/edit"
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
