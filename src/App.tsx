// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddBibliotekar from "./Pages/Bibliotekari/AddBibliotekar";
import Bibliotekari from "./Pages/Bibliotekari/Bibliotekari";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
