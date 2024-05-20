/** @format */

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import DcListDoc from "../dcListDocument/dcListDoc";
import {
  Typography,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
} from "@material-ui/core";
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
import { useNavigate, Link } from "react-router-dom";
import SaleReturnablesNonDCDocs from "../document/NonDcdoc";
import InvoiceNon from "../document/NonRDcIn";

const SaleOrderDcNRlist = (setDocument) => {
  let history = useNavigate();
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [selectedRowDetailsdcNRIn, setSelectedRowDetailsdcNRIn] =
    useState(null);
  const [items, setItems] = useState([]);
  const [itemsDc, setDcItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDCData, setDCTableData] = useState([]);

  const [dataLoading, setDataLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newsaleordernondcId, setNewSaleordernondcId] = useState(null);
  const [newSaleOrderNRId, setNewSaleOrderNRId] = useState(null);
  const [dialogContent, setDialogContent] = useState(""); // Define dialogContent state
  const [dialogContentInvDoc, setDialogContentInvDoc] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchInput, tableData]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await fetch(
        "http://192.168.29.223:8080/api/SoOrders/getAllSo"
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

  // useEffect(() => {
  //   fetchDCReturnsData();
  // }, []);

  const fetchDCReturnsData = async (soid) => {
    try {
      const response = await fetch(
        `http://192.168.29.223:8080/api/Dc/getAllDCById/${soid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Nr DC returns data");
      }
      const dcReturnsData = await response.json();
      setDCTableData(dcReturnsData);
    } catch (error) {
      console.error("Error fetching  Nr DC returns data:", error.message);
    }
  };

  const handleDcClick = (row) => {
    setSelectedRowDetails(row);
    setNewSaleordernondcId(row.saleorderId);
    // console.log("iam umesh dc click " + newsaleordernondcId);
    setDialogOpen(true);
    setDialogContent("dcReturns"); // Set dialog content
    fetchDCReturnsData(row.saleorderId);
    console.log(row.saleorderId);
  };

  const handleDocumentView = (row) => {
    // console.log("I am from new DcInvoive " + row.saleorderId);
    setSelectedRowDetailsdcNRIn(row);
    setNewSaleOrderNRId(row.saleorderId);
    setDialogOpen(true);
    setDialogContentInvDoc("dcNRInvoice");
  };

  const handleCloseModal = () => {
    setSelectedRowDetails(null);
    setItems([]);
    setDialogOpen(false);
  };

  const handleCloseModalInDoc = () => {
    setSelectedRowDetailsdcNRIn(null);
    setItems([]);
    setDialogOpen(false);
  };

  const filterData = () => {
    const filtered = tableData.filter(
      (row) =>
        row.companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.poNo.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Header
        title="Sales Order NR Dc List"
        subtitle="Check Your Sales Order NR Dc Reports Here"
      />
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
                    onClick={() => handleDcClick(row)}
                    className="viewedit"
                  >
                    View
                  </button>
                  <button
                    className="viewedit"
                    onClick={() => handleDocumentView(row)}
                  >
                    Document
                  </button>
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
            Dc Non-Returns
          </h4>
          {dialogContent === "dcReturns" && selectedRowDetails && (
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
              <Table>
                <TableHead style={{ backgroundColor: "#525DB5" }}>
                  <TableRow>
                    <TableCell style={{ textAlign: "center", color: "white" }}>
                      S.No
                    </TableCell>
                    <TableCell style={{ textAlign: "center", color: "white" }}>
                      Material No
                    </TableCell>
                    <TableCell style={{ textAlign: "center", color: "white" }}>
                      Description
                    </TableCell>
                    <TableCell style={{ textAlign: "center", color: "white" }}>
                      Quantity
                    </TableCell>
                    {/* <TableCell style={{textAlign: "center",color: "white"}}>Size</TableCell> */}
                    <TableCell style={{ textAlign: "center", color: "white" }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableDCData.map((row, index) => (
                    <TableRow
                      key={index}
                      style={{ textAlign: "center", color: "white" }}
                    >
                      <TableCell
                        style={{ textAlign: "center", color: "white" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", color: "white" }}
                      >
                        {row.materialNo}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", color: "white" }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", color: "white" }}
                      >
                        {row.quantity}
                      </TableCell>
                      {/* <TableCell style={{textAlign: "center",color: "white"}}>{row.size}</TableCell> */}
                      <TableCell
                        style={{ textAlign: "center", color: "white" }}
                      >
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <SaleReturnablesNonDCDocs
                newsaleordernondcId={newsaleordernondcId}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
          {/* <Button onClick={handleCloseModal} color="secondary">
            Document
          </Button> */}
        </DialogActions>
      </Dialog>

      {/* This is for invoice Save POP-UP */}
      <Dialog
        open={!!selectedRowDetailsdcNRIn}
        onClose={handleCloseModalInDoc}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <h4 class="MuiTypography-root MuiTypography-h5 css-1ph60q2-MuiTypography-root mb-2">
            Dc Non-Returns
          </h4>
          {dialogContentInvDoc === "dcNRInvoice" &&
            selectedRowDetailsdcNRIn && (
              <Box
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column"
              >
                {/* <TableContainer style={{marginTop:"10px"}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="body1" component="span">
                      Company Name:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {selectedRowDetailsdcNRIn.companyName}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body1" component="span">
                      Delivery Date:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {selectedRowDetailsdcNRIn.deliveryDate}
                    </Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="body1" component="span">
                      PO Number:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {selectedRowDetailsdcNRIn.poNo}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body1" component="span">
                      Status:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {selectedRowDetailsdcNRIn.status}
                    </Typography>
                  </div>
                </div>
              </TableContainer> */}
                {/* <Table>
                  <TableHead style={{ backgroundColor: '#525DB5'}}>
                    <TableRow >
                      <TableCell style={{textAlign: "center",color: "white"}}>S.No</TableCell>
                      <TableCell style={{textAlign: "center",color: "white"}}>Material No</TableCell>
                      <TableCell style={{textAlign: "center",color: "white"}}>Description</TableCell>
                      <TableCell style={{textAlign: "center",color: "white"}}>Quantity</TableCell>
                     
                      <TableCell style={{textAlign: "center",color: "white"}}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableDCData.map((row, index) => (
                      <TableRow key={index} style={{ textAlign: "center",color: "white"}}>
                        <TableCell style={{ textAlign: "center",color: "white"}}>{index+1}</TableCell>
                        <TableCell style={{ textAlign: "center",color: "white"}}>{row.materialNo}</TableCell>
                        <TableCell style={{ textAlign: "center",color: "white"}}>{row.description}</TableCell>
                        <TableCell style={{textAlign: "center",color: "white"}}>{row.quantity}</TableCell>
                        
                        <TableCell style={{textAlign: "center",color: "white"}}>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
                <InvoiceNon newSaleOrderNRId={newSaleOrderNRId} />
              </Box>
            )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalInDoc} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SaleOrderDcNRlist;
