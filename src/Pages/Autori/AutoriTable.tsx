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
          Authorization: "Bearer 3176|KIiql8TLpnJ0ozc3mprKnP64fxeXF67DviptkXRB",
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
      <div className="grid-container">
        <div className="grid-header">Ime i Prezime</div>
        <div className="grid-header">Opis</div>
        <div className="grid-header"></div>
        {filteredUsers.map((user) => (
          <React.Fragment key={user.id}>
            <div className="grid-item">
              {user.name} {user.surname}
            </div>
            <div className="grid-item">
              <p>
                {`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam ad voluptate ea. Aperiam, consequatur nulla laboriosam earum similique voluptas delectus incidunt voluptatum, explicabo omnis, iste velit quae non consectetur sit.`.substring(
                  0,
                  50
                )}
                ...
              </p>
            </div>
            <div className="grid-item">
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
          grid-template-columns: 2fr 4fr auto;
          width: 50rem;
          gap: 0.5rem;
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
        .dots {
          cursor: pointer;
          margin: 0;
          width: 2rem; /* Shorter width for the last column */
        }
      `}</style>
    </div>
  );
};

export default AutoriTable;
