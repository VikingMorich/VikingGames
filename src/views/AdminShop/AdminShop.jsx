import "./AdminShop.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { AdminMenu } from "../../components/AdminMenu/AdminMenu";
import DataTable, { createTheme } from "react-data-table-component";
import { useMemo } from "react";
import { updatePurchaseDeliveryStatus } from "../../functions/adminFunctions";

export const AdminShop = () => {
  const { user, vikingGamesdb } = useGlobalDB();

  createTheme(
    "customDataTable",
    {
      text: {
        primary: "#f5e9d3",
        secondary: "#c0c0c0",
      },
      divider: {
        default: "#f5e9d3",
      },
      background: {
        default: "#3e2f20",
      },
    },
    "dark",
  );

  const handleDeliveryClick = async (purchaseId) => {
    //console.log("Toggle delivery status for purchase ID:", purchaseId);
    try {
      await updatePurchaseDeliveryStatus(
        purchaseId,
        vikingGamesdb?.Purchase?.[purchaseId]?.delivered ?? false,
      );
    } catch (e) {
      console.error(e);
    }
  };

  // Column definitions for Purchase view
  const columns = [
    {
      name: "Data de compra",
      selector: (row) => row.purchaseDateFormatted,
      sortable: true,
      wrap: true,
    },
    {
      name: "Id_U",
      selector: (row) => row.userId,
      sortable: true,
      width: "60px",
    },
    {
      name: "User",
      selector: (row) => row.username,
      sortable: true,
      wrap: true,
      width: "90px",
    },
    {
      name: "Id_I",
      selector: (row) => row.itemId,
      sortable: true,
      width: "60px",
    },
    {
      name: "Item comprat",
      selector: (row) => row.itemName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      width: "85px",
    },
    {
      name: "Delivered",
      width: "50px",
      cell: (row) => (
        <div className="table-buttons-wrap">
          <div
            className="table-button"
            id={row.id}
            onClick={(el) => {
              handleDeliveryClick(el.currentTarget.id);
            }}
          >
            🚚
          </div>
        </div>
      ),
    },
  ];

  const formatPurchaseDate = (dateIso) => {
    if (!dateIso) return "";
    const d = new Date(dateIso);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} - ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
  };

  // Build data for DataTable from vikingGamesdb.Purchase, enriching with usernames/item names
  const data = useMemo(() => {
    const purchases = vikingGamesdb?.Purchase || {};
    const users = vikingGamesdb?.Users || {};
    const shop = vikingGamesdb?.Shop || {};

    return Object.entries(purchases)
      .reverse()
      .map(([id, p], index) => {
        const userObj = users?.[p.userId] ?? null;
        const itemObj = shop?.[p.itemId] ?? null;
        const dateIso = p?.purchaseDate ?? null;
        const purchaseDateFormatted = formatPurchaseDate(dateIso);

        return {
          id,
          userId: p.userId ?? "",
          username: userObj?.username ?? p.userId ?? "",
          itemId: p.itemId ?? "",
          itemName: itemObj?.name ?? p.itemId ?? "",
          price: Number(p.price ?? 0) + " 🪙",
          purchaseDate: dateIso,
          purchaseDateFormatted,
          delivered: Boolean(p.delivered),
          rowIndex: index,
        };
      });
  }, [vikingGamesdb]);

  // Pintar filas condicionadas (ej. entregadas en verde)
  const conditionalRowStyles = [
    {
      when: (row) => row.rowIndex % 2 === 0, // even (0,2,4...)
      style: {
        backgroundColor: "#665b31",
        color: "#f5e9d3",
      },
    },
    {
      when: (row) => row.rowIndex % 2 === 1, // odd (1,3,5...)
      style: {
        backgroundColor: "#7c6e3b",
        color: "#f5e9d3",
      },
    },
    {
      when: (row) => row.delivered === true,
      style: {
        backgroundColor: "#04b02f !important",
        color: "#f0e5d1",
      },
    },
  ];

  return (
    <>
      {user?.email === "enricmoriche91@hotmail.com" ? (
        <>
          <AdminMenu />
          <div className="section-view">
            <h1 className="section-title">Admin Shop</h1>
            <DataTable
              columns={columns}
              data={data}
              conditionalRowStyles={conditionalRowStyles}
              pagination
              paginationPerPage={20}
              theme="customDataTable"
              dense
            />
          </div>
        </>
      ) : (
        <>Usuari no autoritzat.</>
      )}
    </>
  );
};
