import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";

const DeliveryChallan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Id" },
    {
      field: "po no",
      headerName: "PO No",
      width: 100,
      cellClassName: "name-column--cell",
    },
    {
      field: "vehicle no",
      headerName: "Vehicle No",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 200,
    },
    { field: "description", headerName: "Description", width: 200 },
    { field: "size", headerName: "Size", width: 200 },
    { field: "remarks", headerName: "Remarks", width: 200 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 200,
    },
  ];
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DeliveryChallan" subtitle="Check Your DeliveryChallan Reports Here" />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default DeliveryChallan;
