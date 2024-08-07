import React, { useState, useEffect, useCallback } from "react";
import { MoreOutlined } from "@ant-design/icons";
import ApiService from "../../Shared/api";

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

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getAuthors(searchQuery);

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (Array.isArray(response.data?.data)) {
        setUsers(response.data.data);
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
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
      `}</style>
    </div>
  );
};

export default AutoriTable;
