/** @format */

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import swal from "sweetalert";
import FacebookCircularProgress from "../../Buffers/AllBuffers";
import { useNavigate } from "react-router-dom";

const SaleOrderReturnablesForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isReminderSet, setIsReminderSet] = useState(false); // State for reminder checkbox
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    setLoading(true); // Show buffer
    try {
      const formData = {
        ...values,
        isReminderSet: isReminderSet, // Include isReminderSet in the form data
      };

      console.log(formData);

      const response = await fetch(
        "http://192.168.29.223:8080/api/SoRetOrders/SoSave",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status >= 200 && response.status <= 300) {
        swal("Good job!", "You clicked the button!", "success");
        navigate("/saleOrderReturnList");
      } else {
        swal("Bad job!", "You clicked the button!", "error");
      }

      resetForm();
      setError(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle network errors (e.g., server not running)
      swal("Server issue!", "Check server connection", "error");
    } finally {
      setLoading(false); // Hide buffer regardless of success or failure
    }
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "approved" },
  ];

  const initialValues = {
    poNo: "",
    projectName: "",
    projectUnitNo: "",
    emailId: "",
    contactNumber: "",
    amount: "",
    status: "",
    expiryDate: "",
    companyName: "",
    deliveryDate: "",
  };

  const checkoutSchema = yup.object().shape({
    companyName: yup
      .string()
      .required("Company Name No is required")
      .max(100, "Company Name must be at most 100 characters")
      .required("Company Name is required"),
    poNo: yup
      .string()
      .max(10, "PO Number should be at most 10 digits")
      .required("PO Number is required"),
    projectName: yup
      .string()
      .required("Project Name No is required")
      .max(50, "Project Name must be at most 50 characters")
      .required("Project Name is required"),
    projectUnitNo: yup
      .string()
      .max(20, "Project Unit Number must be at most 20 characters")
      .required("Unit Number is required"),
    emailId: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .max(50, "Email must be at most 50 characters"),
    contactNumber: yup
      .string()
      .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
      .required("Contact number is required"),
    amount: yup
      .string()
      .matches(/^\d+$/, "Amount must contain only digits")
      .min(1, "Amount must be at least 1 digit")
      .max(20, "Amount must be at most 15 digits")
      .required("Amount is required"),
    status: yup.string().required("status is required"),
    expiryDate: yup
      .date()
      .required("End Date is required")
      .min(
        new Date(Date.now() + 24 * 60 * 60 * 1000),
        "End Date must be 24hr or later"
      ),
    deliveryDate: yup
      .date()
      .required("Delivery Date is required")
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        "Delivery Date must be Today or Later"
      ),
  });

  return (
    <Box m="20px">
      <Header
        title="CREATE SALES ORDER FOR RETURNABLES"
        subtitle="Create a New SaleOrder For Returnables"
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
                autoComplete="off"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="PO Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.poNo}
                name="poNo"
                autoComplete="off"
                error={!!touched.poNo && !!errors.poNo}
                helperText={touched.poNo && errors.poNo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Project Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectName}
                name="projectName"
                autoComplete="off"
                error={!!touched.projectName && !!errors.projectName}
                helperText={touched.projectName && errors.projectName}
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
                autoComplete="off"
                error={!!touched.projectUnitNo && !!errors.projectUnitNo}
                helperText={touched.projectUnitNo && errors.projectUnitNo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.emailId}
                name="emailId"
                autoComplete="off"
                error={!!touched.emailId && !!errors.emailId}
                helperText={touched.emailId && errors.emailId}
                sx={{ gridColumn: "span 2" }}
              />
              <Box sx={{ gridColumn: "span 1" }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={!!touched.status && !!errors.status}
                >
                  <InputLabel>status</InputLabel>
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
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Rental Expiry Date "
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expiryDate}
                name="expiryDate"
                error={!!touched.expiryDate && !!errors.expiryDate}
                helperText={touched.expiryDate && errors.expiryDate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactNumber}
                name="contactNumber"
                error={!!touched.contactNumber && !!errors.contactNumber}
                helperText={touched.contactNumber && errors.contactNumber}
                sx={{ gridColumn: "span 2" }}
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
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Delivery Date "
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.deliveryDate}
                name="deliveryDate"
                error={!!touched.deliveryDate && !!errors.deliveryDate}
                helperText={touched.deliveryDate && errors.deliveryDate}
                sx={{ gridColumn: "span 1" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isReminderSet}
                    onChange={(e) => setIsReminderSet(e.target.checked)}
                    name="isReminderSet"
                  />
                }
                label="Set Reminder"
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit {loading && <FacebookCircularProgress />}
              </Button>
            </Box>
            {error && (
              <Box mt={2} color="error.main">
                {error}
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SaleOrderReturnablesForm;
