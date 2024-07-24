import React, { useState, useEffect, useCallback } from "react";

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

const BibliotekariTable: React.FC = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bibliotekari-table">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img
            src={user.photoPath || "https://via.placeholder.com/100"}
            alt={`${user.name || "Unknown"} ${user.surname || "User"}`}
            className="user-photo"
          />
          <div className="user-info">
            <div className="user-details">
              <h3>{user.username || "No Name"}</h3>
              <p>
                <strong>JMBG:</strong> {user.jmbg || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {user.role || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))}
      <style>{`
        .bibliotekari-table {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        .user-card {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .user-photo {
          margin-right: 15px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .user-info {
          flex: 1;
        }
        .user-details {
          display: flex;
          flex-direction: column;
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
  );
};

export default BibliotekariTable;
