import React, { useState, useEffect, useCallback } from "react";
import { MoreOutlined } from "@ant-design/icons";

interface User {
  id: number;
  name: string;
  surname: string;
}

interface AutoriTableProps {
  searchQuery: string;
}

const AutoriTable: React.FC<AutoriTableProps> = ({ searchQuery }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiEndpoint = "https://biblioteka.simonovicp.com/api/authors";

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Authorization: "Bearer 2919|90b48xI4cMhDaAPlo1Avc0bVjgFPxYmrwcPWZe2Y",
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (Array.isArray(result)) {
        setUsers(result);
      } else if (Array.isArray(result.data)) {
        setUsers(result.data);
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
        <h3>Ime i Prezime</h3>
        <p style={{ marginLeft: "4.5rem" }}>Opis</p>
      </div>
      <div className="autori-table">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-name">
              <h3>
                {user.name} {user.surname}
              </h3>
            </div>
            <div className="user-description">
              <p>
                {`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam ad voluptate ea. Aperiam, consequatur nulla laboriosam earum similique voluptas delectus incidunt voluptatum, explicabo omnis, iste velit quae non consectetur sit.`.substring(
                  0,
                  50
                )}
                ...
              </p>
            </div>
            <div className="user-more">
              <MoreOutlined className="dots" style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .wrapper {
          display:flex;
          flex-direction: column;
          align-items: center;
          margin-top: 3rem;
        }
        .autori-table {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50rem;
        }
        .user-card {
          display: grid;
          grid-template-columns: 1fr 3fr auto;
          align-items: center;
          border: 1px solid #ccc;
          padding: 1rem;
          width: 100%;
          max-width: 50rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .user-name {
          grid-column: 1 / 2;
        }
        .user-description {
          grid-column: 2 / 3;
          margin-left: 2rem;
        }
        .user-more {
          grid-column: 3 / 4;
        }
        h3 {
          margin: 0;
          font-size: 1.2em;
        }
        p {
          margin-left: 3rem;
        }
      `}</style>
    </div>
  );
};

export default AutoriTable;
