import { useState, useEffect } from "react";

interface Column {
  key: string;
  header: string;
  type?: string;
}

interface User {
  photoPath: string;
  name: string;
  surname: string;
  jmbg: string;
  [key: string]: any;
}

interface ReusableTableProps {
  apiEndpoint: string;
  headers: { [key: string]: string };
  body: { [key: string]: any };
  columns: Column[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
}

function Table({
  apiEndpoint,
  headers,
  body,
  columns,
  rowsPerPageOptions = [10, 20, 50],
  defaultRowsPerPage = 20,
}: ReusableTableProps) {
  const [data, setData] = useState<User[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const result = await response.json();
        console.log(result);
        if (result.success) {
          setData(result.data);
        } else {
          console.error("API response was not successful:", result);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [apiEndpoint, headers, body]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, rowsPerPage).map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.type === "image" ? (
                    <img
                      src={row[column.key]}
                      alt="Profile"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Rows per page:
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
        <span>
          1 of 1<button>&lt;</button>
          <button>&gt;</button>
        </span>
      </div>
    </div>
  );
}

export default Table;
