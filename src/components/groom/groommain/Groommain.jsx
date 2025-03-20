import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Groommain.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Groommain = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          // Customize theme if needed
        },
      }),
    []
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/v1/bride-groom?gender=male"
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch data.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleThreeDotsClick = (event, row) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + window.scrollX,
    });
    setPopupVisible(!popupVisible);
    setSelectedRow(row.original);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedRow(null);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "fullName", header: "Name" },
      { accessorKey: "mobileNumber", header: "Mobile Number" },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      { accessorKey: "city", header: "Location" },
      {
        accessorKey: "annualIncome",
        header: "Annual Income",
        Cell: ({ cell }) => (cell.getValue() ? `$${cell.getValue()}` : "N/A"),
      },
      {
        accessorKey: "profilePhoto",
        header: "Image",
        Cell: ({ cell }) =>
          cell.getValue() ? (
            <img
              src={cell.getValue()}
              alt="Profile"
              className={styles.imagemain}
            />
          ) : (
            "No Image"
          ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div
            className={styles.actionsContainer}
            onClick={(event) => handleThreeDotsClick(event, row)}
          >
            <button className={styles.threeDotsButton}>...</button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className={styles.table_container}>
      <ThemeProvider theme={theme}>
        <div className={styles.groommain}>
          <Link to="/addprofile">Add Groom</Link>
        </div>
        <h2 className={styles.title}>Grooms</h2>
        {isLoading ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : (
          <MaterialReactTable
            columns={columns}
            data={data}
            className={styles.tablemain}
          />
        )}
        {popupVisible && popupPosition && (
          <div
            className={styles.popup}
            style={{
              top: popupPosition.top,
              left: popupPosition.left,
            }}
          >
            <div className={styles.popupOption}>View</div>
            <div className={styles.popupOption}>Edit</div>
            <div className={styles.popupOption}>Delete</div>
          </div>
        )}
        {popupVisible && (
          <div className={styles.overlay} onClick={closePopup}></div>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Groommain;
