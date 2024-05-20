/** @format */

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = (props) => {
  const [tableDataForm, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track the selected item ID
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    fetchingData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchInput, tableDataForm]);

  const fetchingData = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.223:8080/api/warehouse/allitems"
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

  const handleEdit = (index) => {
    const selectedItem = tableDataForm[index];
    setSelectedItemId(selectedItem.soiRetId); //Set the selected item ID

    setEditIndex(index);
    setEditMode(true);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const url = editMode
        ? ` http://192.168.29.223:8080/api/warehouse/update/${selectedItemId}` // Use the selected item ID for updating
        : "http://192.168.29.223:8080/api/warehouse/save";

      const method = editMode ? "PUT" : "POST"; // Use PUT method for updating

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        fetchingData();
        resetForm();
        setEditMode(false);
        setSelectedItemId(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const calculateAmount = (quantity, rate) => {
    return quantity * rate;
  };

  const initialValues = {
    materialNo: "",
    description: "",
    quantity: "",
    rate: "",
    amount: "", // No need to initialize amount here
  };

  // Form validation schema
  const checkoutSchema = yup.object().shape({
    // Define your validation rules here
    materialNo: yup
      .number()
      .positive("materialNo must be a positive number")
      .required("Required"),
    description: yup.string().required("Required"),
    quantity: yup
      .number()
      .positive("quantity must be a positive number")
      .required("Required"),
    rate: yup
      .number()
      .positive("rate must be a positive number")
      .required("Required"),
    amount: yup
      .number()
      .positive("amount must be a positive number")
      .required("Required"),
  });

  // Filter tableDataForm based on search query
  // const filteredTableData = tableDataForm.filter((item) =>
  //   item.materialNo.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filterData = () => {
    const filtered = tableDataForm.filter(
      (row) =>
        row.materialNo &&
        row.materialNo.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Box m="20px">
      <Header title="CREATE STOCKS" subtitle="Create a New Stocks" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Form fields here */}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Form fields here... */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="MaterialNo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.materialNo}
                name="materialNo"
                autoComplete="off"
                error={!!touched.materialNo && !!errors.materialNo}
                helperText={touched.materialNo && errors.materialNo}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                autoComplete="off"
                onBlur={(e) => {
                  handleBlur(e);
                  values.amount = calculateAmount(values.quantity, values.rate);
                }}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Rate"
                autoComplete="off"
                onBlur={(e) => {
                  handleBlur(e);
                  values.amount = calculateAmount(values.quantity, values.rate);
                }}
                onChange={handleChange}
                value={values.rate}
                name="rate"
                error={!!touched.rate && !!errors.rate}
                helperText={touched.rate && errors.rate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 1" }}
              />

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {editMode ? "Update" : "Add Item"}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
      <br />
      <br />
      {/* Table display here */}
      <Box mt="20px">
        <Header title="ADDED STOCKS" />
        {/* Search bar */}
        <TextField
          fullWidth
          variant="outlined"
          label="Search by MaterialNo"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ mb: 4 }}
        />
        {/* <TableContainer component={Paper} mt={4}>
          <Table>
            <TableHead style={{ backgroundColor: "#4379BF" }}>
              <TableRow>
                <TableCell>MaterialNo</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Amount</TableCell>

                
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.materialNo}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell>{row.amount}</TableCell>

                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#525DB5" }}>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                S.No
              </th>
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
  );
};

export default Item;
