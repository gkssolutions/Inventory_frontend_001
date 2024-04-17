import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  InputLabel,
  FormControl,
  Snackbar,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { Select, MenuItem } from "@mui/material";
import FacebookCircularProgress from "../../Buffers/AllBuffers";

import swal from "sweetalert";
const PurchaseOrder = () => {
  const [setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State to manage success snackbar
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true); // Show buffer
    try {
      const response = await fetch(
        "http://localhost:8088/api/SoOrders/SoSaves",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.status > 200) {
        swal("Bad job!", "You clicked the button!", "error");
      } else swal("Good job!", "You clicked the button!", "success");
      resetForm();
      setError(null);
      setSuccess(true); // Show success snackbar
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form");
    } finally {
      setLoading(false); // Hide buffer regardless of success or failure
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const initialValues = {
    poType: "",
    companyName: "",
    deliveryDate: "",
    amount: "",
    status: "",
    poNo: "",
    projectUnitNo: "",
    emailId: "",
    contactNumber: "",
  };

  const checkoutSchema = yup.object().shape({
    poType: yup
      .string()
      .max(50, "Company Name must be at most 50 characters")
      .required("PO Type is required"),
    companyName: yup
      .string()
      .max(50, "Company Name must be at most 50 characters")
      .required("Company Name is required"),
    deliveryDate: yup.date().required("Delivery Date is required"),

    amount: yup
      .string()
      .matches(/^\d+$/, "Amount must contain only digits")
      .min(1, "Amount must be at least 1 digit")
      .max(15, "Amount must be at most 15 digits")
      .required("Amount is required"),
    status: yup.string().required("Status is required"),
    poNo: yup
      .string()
      .max(10, "PO Number should be at most 10 digits")
      .required("PO Number is required"),
    projectUnitNo: yup
      .string()
      .max(20, "Project Unit Number must be at most 20 characters")
      .required("Project Unit Number is required"),
    emailId: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .max(50, "Email must be at most 50 characters"),
    contactNumber: yup
      .string()
      .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
      .required("Contact number is required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE SALES ORDER" subtitle="Create a New Sales Order" />

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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="PO Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.poType}
                name="poType"
                error={!!touched.poType && !!errors.poType}
                helperText={touched.poType && errors.poType}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="PO Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.poNo}
                name="poNo"
                error={!!touched.poNo && !!errors.poNo}
                helperText={touched.poNo && errors.poNo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Project Unit Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectUnitNo}
                name="projectUnitNo"
                error={!!touched.projectUnitNo && !!errors.projectUnitNo}
                helperText={touched.projectUnitNo && errors.projectUnitNo}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Delivery Date"
                InputLabelProps={{ shrink: true }} // This will make the label appear within the field when there's a value
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.deliveryDate}
                name="deliveryDate"
                error={!!touched.deliveryDate && !!errors.deliveryDate}
                helperText={touched.deliveryDate && errors.deliveryDate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.emailId}
                name="emailId"
                error={!!touched.emailId && !!errors.emailId}
                helperText={touched.emailId && errors.emailId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactNumber}
                name="contactNumber"
                error={!!touched.contactNumber && !!errors.contactNumber}
                helperText={touched.contactNumber && errors.contactNumber}
                // disabled={values.contactNumber.length >= 12}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />

              <Box sx={{ gridColumn: "span 2" }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={!!touched.status && !!errors.status}
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="status"
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.status && errors.status && (
                    <FormHelperText>{errors.status}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large" // Set the size to "large"
              >
                Submit {loading && <FacebookCircularProgress />}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PurchaseOrder;
