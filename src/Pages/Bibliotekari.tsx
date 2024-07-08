import React, { Fragment, useState } from "react";
import Header from "../Components/Layout/Header/Header";
import SideMenu from "../Components/Layout/Sidemenu/Sidemenu";
import Title from "../Components/Layout//Title/Title";
import PrimaryBtn from "../Components/Buttons/PrimaryBtn";

interface User {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

const users: User[] = [
  {
    name: "Valentina Kascelan",
    email: "valentina.kascelan@domain...",
    role: "Bibliotekar",
    lastLogin: "Prije 10 sati",
  },
  {
    name: "Tarik Zaimovic",
    email: "tarik.zaimovic@domain.netcom",
    role: "Bibliotekar",
    lastLogin: "Prije 2 dana",
  },
  {
    name: "Test Akontacijevic",
    email: "test.akontacijevic@bild-studio...",
    role: "Bibliotekar",
    lastLogin: "Nije se nikad ulogovao",
  },
  {
    name: "Darko Kascelan",
    email: "darko.kascelan@bild-studio...",
    role: "Bibliotekar",
    lastLogin: "Prije 2 nedelje",
  },
];

const Bibliotekari: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <div>
        <Header />
      </div>
      <div className="layout">
        <div className="Sidemenu">
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="Title">
          <Title isOpen={isOpen} />
          <PrimaryBtn />
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Ime i prezime</th>
                  <th>Email</th>
                  <th>Tip korisnika</th>
                  <th>Zadnji pristup sistemu</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <span>
                Rows per page: {rowsPerPage}{" "}
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </span>
              <span>
                1 of 1 <button>&lt;</button> <button>&gt;</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Bibliotekari;
