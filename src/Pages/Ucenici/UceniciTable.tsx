import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Shared/api";
import { MenuProps, message } from "antd";
import MoreBtn from "../../Components/Buttons/MoreBtn";

interface User {
  id?: number;
  role?: string;
  jmbg?: string;
  photoPath?: string;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  lastActiveDate?: string;
}

interface UceniciTableProps {
  searchQuery: string;
}

const UceniciTable: React.FC<UceniciTableProps> = ({ searchQuery }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const renderMenuItems = (user: User) => {
    var menuItems: MenuProps["items"] = [
      {
        icon: <i className="bi bi-eye" style={{ fontSize: "1rem" }}></i>,
        label: <p style={{ margin: "0" }}>Detalji</p>,
        key: "0",
        onClick: () => {
          console.log("View user with id:", user.id);
          navigate(`/ucenik/${user.id}`);
        },
      },
      {
        icon: (
          <i className="bi bi-pencil-square" style={{ fontSize: "1rem" }}></i>
        ),
        label: <p style={{ margin: "0" }}>Izmjeni</p>,
        key: "1",
        onClick: () => {
          console.log("Edit user with id:", user.id);
          navigate(`/ucenik/${user.id}/edit`);
        },
      },
      {
        icon: <i className="bi bi-trash3" style={{ fontSize: "1rem" }}></i>,
        label: <p style={{ margin: "0" }}>Obrisi</p>,
        key: "2",
        onClick: async () => {
          console.log("Delete user with id:", user.id);
          try {
            const response = await ApiService.deleteStudent(user.id);
            if (response.message === "Success") {
              setUsers((prevUsers) =>
                prevUsers.filter((u) => u.id !== user.id)
              );
              message.success("Korisnik obrisan");
            } else {
              message.error(`Failed to delete user: ${response.error}`);
            }
          } catch (error) {
            message.error("Failed to delete user");
            console.error("Error deleting user:", error);
          }
        },
      },
    ];
    return menuItems;
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getStudents(searchQuery);
      if (response.error) {
        setError(response.error);
        return;
      }
      console.log("API Response:", response);
      if (Array.isArray(response.data?.data)) {
        setUsers(
          response.data.data.filter((user: User) => user.role === "Učenik")
        );
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name} ${user.surname}`.toLowerCase();
    return fullName.startsWith(searchQuery.toLowerCase());
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="grid-container">
        <div className="grid-header">Slika</div>
        <div className="grid-header">Ime i Prezime</div>
        <div className="grid-header">E-mail</div>
        <div className="grid-header">Posljednji put aktivan</div>
        <div className="grid-header"></div>
        {filteredUsers.map((user) => (
          <React.Fragment key={user.id}>
            <div className="grid-item">
              <img
                src={user.photoPath || "https://via.placeholder.com/100"}
                alt={`${user.name || "Unknown"} ${user.surname || "User"}`}
                className="user-photo"
              />
            </div>
            <div className="grid-item">
              {user.name || "No Name"} {user.surname || "No Surname"}
            </div>
            <div className="grid-item">{user.email || "N/A"}</div>
            <div className="grid-item">Lorem Ipsum</div>
            <div className="grid-item action-column">
              <MoreBtn items={renderMenuItems(user)} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <style>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 3rem;
          width: 100%;
          padding: 0 1rem;
          box-sizing: border-box;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
        }
        .grid-header {
          font-weight: bold;
          border-bottom: 2px solid #ccc;
          padding: 0.5rem;
          text-align: center;
        }
        .grid-item {
          border-bottom: 1px solid #ccc;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
        .user-photo {
          margin-right: 1rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
      @media (max-width: 768px) {
        .grid-container {
          grid-template-columns: repeat(4, 1fr); 
        }
        .grid-header:nth-child(3) {
          display: none; 
        }
        .grid-item:nth-child(5n + 3) {
          display: none; 
        }
      }
      `}</style>
    </div>
  );
};

export default UceniciTable;
