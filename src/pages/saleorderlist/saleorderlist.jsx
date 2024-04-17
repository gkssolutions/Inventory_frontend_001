import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogActions, useTheme,TableContainer, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {Typography } from '@material-ui/core';
import SaleOrderForm from '../../pages/salesorderlistform/salesorderlistform'; // Corrected import path


const SaleOrderlist = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "S.No", width: 100 },
    { field: "company_name", headerName: "Company Name", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "po_number", headerName: "Po Number", width: 200 },
    { field: "delivery_date", headerName: "Delivery Date", width: 200 },
    { field: "actions", headerName: "Actions", width: 200, renderCell: ViewButton },
  ];

  const mockDataTeam = [
    { id: 1, company_name: 'ABC Inc.', status: 'Pending', po_number: 'PO-001', delivery_date: '2024-04-10' },
    { id: 2, company_name: 'XYZ Corp.', status: 'Completed', po_number: 'PO-002', delivery_date: '2024-04-12' },
    { id: 3, company_name: '123 Ltd.', status: 'Pending', po_number: 'PO-003', delivery_date: '2024-04-14' },
    // Add more data as needed
  ];

  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [items, setItems] = useState([]);

  const handleViewClick = (row) => {
    setSelectedRowDetails(row);
    setItems([]); // Clear items on every view click
  };

  const handleCloseModal = () => {
    setSelectedRowDetails(null);
    setItems([]); // Clear items when closing modal
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  function ViewButton(params) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleViewClick(params.row)}
      >
        View
      </Button>
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SalesOrderList" subtitle="Check Your SalesOrder Reports Here" />
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
        <DataGrid rows={mockDataTeam} columns={columns} style={{ width: "100%"}} />
      </Box>

      <Dialog open={!!selectedRowDetails} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogContent>
          {selectedRowDetails && (
            <Box width="100%" height="100%" display="flex" flexDirection="column">
              <TableContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="body1" component="span">
                        Company Name:
                    </Typography>
                    <Typography variant="body1" component="span">
                        {selectedRowDetails.company_name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body1" component="span">
                        Delivery Date:
                    </Typography>
                    <Typography variant="body1" component="span">
                        {selectedRowDetails.delivery_date}
                    </Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="body1" component="span">
                        PO Number:
                    </Typography>
                    <Typography variant="body1" component="span">
                        {selectedRowDetails.po_number}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body1" component="span">
                        Status:
                    </Typography>
                    <Typography variant="body1" component="span">
                        {selectedRowDetails.status}
                    </Typography>
                  </div>
                </div>
              </TableContainer>
              <SaleOrderForm
                materialNo={selectedRowDetails.materialNo}
                description={selectedRowDetails.description}
                qty={selectedRowDetails.qty}
                amount={selectedRowDetails.amount}
                items={items}
                setItems={setItems}
              />
              
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default SaleOrderlist;
