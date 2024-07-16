import { useState } from "react";
import "./BibliotekariTable.css";

function BibliotekariTable() {
  interface User {
    name: string;
    email: string;
    lastLogin: string;
  }

  const users: User[] = [
    {
      name: "Valentina Kascelan",
      email: "valentina.kascelan@domain...",
      lastLogin: "Prije 10 sati",
    },
    {
      name: "Tarik Zaimovic",
      email: "tarik.zaimovic@domain.netcom",
      lastLogin: "Prije 2 dana",
    },
    {
      name: "Test Akontacijevic",
      email: "test.akontacijevic@bild-studio...",
      lastLogin: "Nije se nikad ulogovao",
    },
    {
      name: "Darko Kascelan",
      email: "darko.kascelan@bild-studio...",
      lastLogin: "Prije 2 nedelje",
    },
  ];

  const [rowsPerPage, setRowsPerPage] = useState(20);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Ime i prezime</th>
            <th>Email</th>
            <th>Zadnji pristup sistemu</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
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
  );
}

export default BibliotekariTable;
