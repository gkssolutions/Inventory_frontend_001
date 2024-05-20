/** @format */

import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const AdminPurchaseRequestList = (props) => {
  const [tableDataForm, setTableData] = useState([]);
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.223:8080/api/Porequest/allitems"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApproved = (index) => {
    // Handle approval logic here, you can use the index or row data to identify the item
    console.log("Approved item at index:", index);
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(tableDataForm);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "purchase_requests.xlsx"
    );
  };

  return (
    <div style={{ margin: "20px" }}>
      <Box mt="20px">
        <Box
          display={smScreen ? "flex" : "block"}
          flexDirection={smScreen ? "row" : "column"}
          justifyContent={smScreen ? "space-between" : "start"}
          alignItems={smScreen ? "center" : "start"}
          m="10px 0"
        >
          <Header title="PURCHASE REQUEST LIST" />
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              variant="contained"
              color="primary"
              onClick={exportToExcel}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Export
            </Button>
          </Box>
        </Box>

        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#525DB5" }}>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
              MaterialNo
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
              Description
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
              Quantity
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
              Rate
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
              Amount
              </th>
              
            </tr>
          </thead>
          <tbody>
            {tableDataForm.map((row, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.materialNo}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.description}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.quantity}
                </td>
                
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.rate}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Box>
    </div>
  );
};

export default AdminPurchaseRequestList;
