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

interface UceniciTableProps {
  searchQuery: string;
}

const UceniciTable: React.FC<UceniciTableProps> = ({ searchQuery }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiEndpoint = "https://biblioteka.simonovicp.com/api/users";

  const fetchData = useCallback(async (retryCount = 0) => {
    const maxRetries = 5;
    const retryDelay = 1000 * Math.pow(2, retryCount);

    const headers = {
      Authorization: "Bearer 2031|kwS1XIzZQT94d9VRldypWYBAWjKkOU2Oe6LyTpGe",
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers,
      });

      if (response.status === 429) {
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

      if (Array.isArray(result.data)) {
        setUsers(result.data.filter((user: User) => user.role === "Učenik"));
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
      <div className="first-card user-card user-details">
        <h3 style={{ marginLeft: "6rem" }}>Ime i Prezime</h3>
        <p>E-mail</p>
        <p style={{ marginRight: "4rem" }}>
          Posljednji put aktivan
          {/*this should be last time user was active */}
        </p>
      </div>
      <div className="ucenici-table">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <img
              src={user.photoPath || "https://via.placeholder.com/100"}
              alt={`${user.name || "Unknown"} ${user.surname || "User"}`}
              className="user-photo"
            />
            <div className="user-info">
              <div className="user-details">
                <h3>
                  {user.name || "No Name"} {user.surname || "No Surname"}
                </h3>
                <p>{user.email || "No email"}</p>
                <p>
                  <strong>Role:</strong> {user.username || "N/A"}{" "}
                  {/*this should be last time user was active */}
                </p>
                <p>
                  <MoreOutlined
                    className="dots"
                    style={{ fontSize: "1.5rem" }}
                  />
                </p>
              </div>
            </div>
          </div>
        ))}
        <style>{`
            .wrapper {
              display:flex;
              flex-direction: column;
              align-items: center;
              margin-top: 3rem;
            }
            .ucenici-table {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 50rem;
            }
            .user-card {
              display: flex;
              flex-direction: row;
              align-items: center;
              border: 1px solid #ccc;
              padding: 1rem;
              width: 100%;
              max-width: 50rem;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .user-photo {
              margin-right: 3rem;
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
            }
            .user-info {
              flex: 1;
            }
            .user-details {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            h3 {
              margin: 0;
              font-size: 1.2em;
            }
            p {
              margin: 5px 0 0;
            }
            strong {
              font-weight: bold;
            }
          `}</style>
      </div>
    </div>
  );
};

export default UceniciTable;
