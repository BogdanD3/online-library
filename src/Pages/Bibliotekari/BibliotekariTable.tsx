import React, { useState, useEffect, useCallback } from "react";
import { MoreOutlined } from "@ant-design/icons";
import ApiService from "../../Shared/api";

interface User {
  id?: number;
  role?: string;
  jmbg?: string;
  photoPath?: string;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
}

interface BibliotekariTableProps {
  searchQuery: string;
}

const BibliotekariTable: React.FC<BibliotekariTableProps> = ({
  searchQuery,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {

    try {

      const response = await ApiService.getLibrarians(searchQuery)

      if(response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (Array.isArray(response.data?.data)) {
        setUsers(
          response.data.data.filter((user: User) => user.role === "Bibliotekar")
        );
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name} ${user.surname}`.toLowerCase();
    return fullName.startsWith(searchQuery.toLowerCase());
  });

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <MoreOutlined className="dots" style={{ fontSize: "1.5rem" }} />
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
        }
        .grid-container {
          display: grid;
          grid-template-columns: auto auto auto auto auto; 
          width: 50rem;
          gap: 1rem;
        }
        .grid-header {
          font-weight: bold;
          border-bottom: 2px solid #ccc;
          padding: 0.5rem;
        }
        .grid-item {
          border-bottom: 1px solid #ccc;
          padding: 0.5rem;
          display: flex;
          align-items: center;
        }
        .user-photo {
          margin-right: 1rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
        .action-column {
          min-width: 3rem; /* Fixed width for action column */
        }
        .dots {
          cursor: pointer;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default BibliotekariTable;
