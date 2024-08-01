import React, { useState, useEffect, useCallback } from "react";
import { MoreOutlined } from "@ant-design/icons";

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

  const apiEndpoint = "https://biblioteka.simonovicp.com/api/users";

  const fetchData = useCallback(async (retryCount = 0) => {
    const maxRetries = 5;
    const retryDelay = 1000 * Math.pow(2, retryCount);

    const headers = {
      Authorization: "Bearer 3150|Ir4VqM3VedMBRljNf4E9sJxcwJ6mqVIfa30EgjmC",
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers,
      });

      if (response.status === 429) {
        // Too Many Requests
        if (retryCount < maxRetries) {
          console.warn(
            `Rate limit exceeded, retrying in ${retryDelay / 1000} seconds...`
          );
          setTimeout(() => fetchData(retryCount + 1), retryDelay);
          return;
        } else {
          throw new Error(
            "Too many requests, exceeded maximum retry attempts."
          );
        }
      }

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();

      console.log("API Response:", result);

      if (Array.isArray(result.data)) {
        setUsers(
          result.data.filter((user: User) => user.role === "Bibliotekar")
        );
      } else {
        console.error("API response did not contain expected data:", result);
        setError("Failed to load data");
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
