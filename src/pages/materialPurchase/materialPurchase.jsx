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
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MaterialPurchase = (props) => {
  const [tableDataForm, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track the selected item ID
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.223:8080/api/purchaserequest/allitems"
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
    console.log(initialValues);
    // console.log(index)
    const selectedItem = tableDataForm[index];
    console.log(selectedItem);
    setSelectedItemId(selectedItem.soiRetId); //Set the selected item ID

    // Populate the form fields with the data of the selected row
    initialValues.materialNo = selectedItem.materialNo;
    initialValues.description = selectedItem.description;
    initialValues.quantity = selectedItem.quantity;
    initialValues.rate = selectedItem.rate;
    initialValues.amount = selectedItem.amount;
    initialValues.tax = selectedItem.tax;

    setEditIndex(index);
    setEditMode(true);
  };
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const url = editMode
        ? `http://192.168.29.223:8080/api/purchaserequest/update/${selectedItemId}` // Use the selected item ID for updating
        : "http://192.168.29.223:8080/api/purchaserequest/save";

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

  const initialValues = {
    materialNo: "",
    description: "",
    quantity: "",
    rate: "",
    amount: "",
    tax: "",
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
    tax: yup
      .number()
      .positive("tax must be a positive number")
      .required("Required"), // Added tax validation
  });

  return (
    <Box m="20px">
      <Header
        title="CREATE PURCHASE REQUEST"
        subtitle="Create a New Purchase Request"
      />

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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                autoComplete="off"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Tax"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tax}
                name="tax"
                autoComplete="off"
                error={!!touched.tax && !!errors.tax}
                helperText={touched.tax && errors.tax}
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
      {/* Table display here */}
      <Box mt="20px">
        <Header title="ADDED PURCHASEREQUEST" />
        <TableContainer component={Paper} mt={4}>
          <Table>
            <TableHead style={{ backgroundColor: "#4379BF" }}>
              <TableRow>
                <TableCell>MaterialNo</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableDataForm.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.materialNo}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.tax}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="secondary"
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="secondary"
                        // onClick={() => handleDelete(index)} // Pass the item ID to delete
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MaterialPurchase;
