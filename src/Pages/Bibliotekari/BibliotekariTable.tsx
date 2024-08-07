import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
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
      const response = await ApiService.getLibrarians(searchQuery);

      if (response.error) {
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
  }, [searchQuery]);

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
              <MoreBtn />
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
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
}
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
  .grid-header:nth-child(3),
  .grid-item:nth-child(5n + 3) {
    display: none;
  }
}

      `}</style>
    </div>
  );
};

export default BibliotekariTable;
