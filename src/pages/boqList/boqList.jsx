/** @format */

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Typography } from "@material-ui/core";
import BoqReturnableListForm from "../boqReturnableListForm/boqReturnableListForm";
import {
  useTheme,
  Box,
  IconButton,
  InputBase,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../../theme";
import SaleReturnablesBoqDocs from "../document/Boqdoc";

const BoqList = () => {
  // Existing code...
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [items, setItems] = useState([]); // State variable to hold the list of items
  const [tableData, setTableData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [convertToDc, setConvertToDc] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false); // State for controlling dialog visibility
  const [newsaleorderBoqId, setNewSaleorderBoqId] = useState(null); // State to store the ID
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchData(); // Fetch initial data when component mounts
  }, []);

  //GET Method For SalesOrders
  useEffect(() => {
    filterData();
  }, [searchInput, tableData]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await fetch(
        "http://192.168.29.223:8080/api/SoRetOrders/getAllSo"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTableData(data);
      setDataLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataLoading(false);
    }
  };

  const handleViewClick = (row) => {
    setSelectedRowDetails(row);
    setNewSaleorderBoqId(row.saleorderRetId);
    console.log(newsaleorderBoqId);
    setDialogOpen(true);
    setItems([]);
  };

  const handleCloseModal = () => {
    setSelectedRowDetails(null);
    setItems([]);
    setDialogOpen(false); // Close dialog
  };

  const filterData = () => {
    const filtered = tableData.filter(
      (row) =>
        (row.companyName &&
          row.companyName.toLowerCase().includes(searchInput.toLowerCase())) ||
        (row.poNo && row.poNo.toLowerCase().includes(searchInput.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Header
        title="SalesOrderBOQList"
        subtitle="Check Your SalesOrder BOQ Reports Here"
      />

      {/* <Topbar showSearchInput={showSearchInput} />  */}

      <Box
        style={{ marginBottom: "10px" }}
        backgroundColor={colors.primary[400]}
        p={0.2}
        borderRadius={1}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by Company Name or PO Number"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          autoComplete="off"
          className="searchinput"
        />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </Box>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#525DB5" }}>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                S.No
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Company Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                PO Number
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
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
                  {row.companyName}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.status}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row.poNo}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleViewClick(row)}
                    className="viewedit"
                  >
                    View
                  </button>
                  {/* <button  className="convertDc" onClick={convertToDcButton}>Convert to DC</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={!!selectedRowDetails}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <h4 class="MuiTypography-root MuiTypography-h5 css-1ph60q2-MuiTypography-root mb-2">
            Adding Items to Sales Order
          </h4>
          {selectedRowDetails && (
            <Box
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
            >
              <TableContainer style={{ marginTop: "10px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography variant="body1" component="span">
                      Company Name:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {selectedRowDetails.companyName}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body1" component="span">
                      Delivery Date:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {selectedRowDetails.deliveryDate}
                    </Typography>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography variant="body1" component="span">
                      PO Number:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {selectedRowDetails.poNo}
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
              <BoqReturnableListForm
                materialNo={selectedRowDetails.materialNo}
                description={selectedRowDetails.description}
                hsnSac={selectedRowDetails.hsnSac}
                quantity={selectedRowDetails.quantity}
                amount={selectedRowDetails.amount}
                status={selectedRowDetails.status}
                items={items}
                setItems={setItems}
                newsaleorderBoqId={newsaleorderBoqId}
                // handleFormSubmit={handleFormSubmit}
              />
              <SaleReturnablesBoqDocs newsaleorderBoqId={newsaleorderBoqId} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
          {/* <Button onClick={()=>handleFormSubmit(selectedRowDetails)} color="secondary">
            Submit
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BoqList;
