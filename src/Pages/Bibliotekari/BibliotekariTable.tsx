import React, { useState, useEffect, useCallback } from "react";
import { Dropdown, Menu, MenuProps } from "antd";
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
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  const items: MenuProps["items"] = [
    {
      icon: <i className="bi bi-bell" style={{ fontSize: "1rem" }}></i>,
      label: "Notifikacije",
      key: "0",
    },
    {
      icon: <i className="bi bi-plus-lg" style={{ fontSize: "1rem" }}></i>,
      label: "Dodaj knjigu",
      key: "1",
    },
    {
      label: "bildStudio",
      key: "2",
    },
    {
      type: "divider",
    },
    {
      icon: (
        <i className="bi bi-person-circle" style={{ fontSize: "1rem" }}></i>
      ),
      label: "Profile",
      key: "3",
    },
  ];

  const apiEndpoint = "https://biblioteka.simonovicp.com/api/users";

  const fetchData = useCallback(async () => {
    const headers = {
      Authorization: "Bearer 3178|PnGlZRQALxNP7EiW7DbYN8cQ53pPcgVje2HBC5N0",
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();

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
              <Dropdown
                overlay={<Menu items={items} />}
                trigger={["click"]}
                visible={dropdownVisible === user.id}
                onVisibleChange={(flag) =>
                  setDropdownVisible(flag ? user.id! : null)
                }
              >
                <p onClick={(e) => e.preventDefault()}>
                  <MoreOutlined className="dots" />
                </p>
              </Dropdown>
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
