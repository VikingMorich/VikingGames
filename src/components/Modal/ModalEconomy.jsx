import { useState, useEffect } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import DataTable, { createTheme } from "react-data-table-component";
import "./ModalEconomy.css";

export const ModalEconomy = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const [dbUser, setDbUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
      ([id, u]) => u.email === user?.email,
    );
    const userCoinsHistory = dbEntry?.[1]?.CoinsHistory || [];
    setData(userCoinsHistory);
  }, [vikingGamesdb, user]);

  createTheme(
    "customDataTable",
    {
      text: {
        primary: "#f5e9d3",
        secondary: "#c0c0c0",
      },
      divider: {
        default: "black", // Líneas horizontales
        border: "black", // Líneas verticales
      },
      background: {
        default: "#3e2f20",
      },
    },
    "dark",
  );

  const columns = [
    {
      name: "Concepte",
      selector: (row) => row.concept,
      wrap: true,
      width: "57%",
    },
    {
      name: "Quantitat",
      selector: (row) => row.amount,
      width: "20%",
    },
    {
      name: "Total",
      selector: (row) => row.total,
      width: "23%",
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.type === "remove", // even (0,2,4...)
      style: {
        backgroundColor: "#b88986ff",
        color: "black",
      },
    },
    {
      when: (row) => row.type === "add", // odd (1,3,5...)
      style: {
        backgroundColor: "#8d9d8aff",
        color: "black",
      },
    },
    {
      when: (row) => row.type === "correction", // odd (1,3,5...)
      style: {
        backgroundColor: "#ddad3dff",
        color: "black",
      },
    },
  ];

  const formattedData = data
    .slice()
    .reverse()
    .map((entry) => ({
      concept: (
        <>
          {new Date(entry.date).toLocaleTimeString()}
          <br />
          {entry.concept}
        </>
      ),
      amount: entry.amount,
      total: entry.total,
      type: entry.type,
    })); // Formatear los datos para el DataTable

  return (
    <div className="c-modal-content-economy">
      <h2>Últims moviments</h2>
      <div className="table-container">
        <DataTable
          columns={columns}
          data={formattedData}
          conditionalRowStyles={conditionalRowStyles}
          pagination
          paginationPerPage={15}
          theme="customDataTable"
          dense
          noDataComponent={
            <div className="no-data-message">
              Encara no s'ha realitzat cap moviment
            </div>
          }
        />
      </div>
    </div>
  );
};
