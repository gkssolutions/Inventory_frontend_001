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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import SoReturnablesDocs from "../document/SoReturnablesDocs";

const PurchaseRequestListForm = (props) => {
  console.log("i am from purcsse list " + props.newPRId);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track the selected item ID
  const [tableDataForm, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  // console.log(props);

  let history = useNavigate();

  //POST Method For Sales ADD Item
  const handleFormSubmitforPR = async (values, { resetForm }) => {
    console.log(values);
    try {
      const url = editMode
        ? `http://192.168.29.223:8080/api/POLIst/getAllPoList/${selectedItemId}` // Use the selected item ID for updating
        : `http://192.168.29.223:8080/api/POLIst/savePOList/${props.newPRId}`;

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
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //POST Data For Convert to DC
  // const handlePostData = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://192.168.29.223:8080/api/convertToDc/${props.newPRId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(tableDataForm),
  //       }
  //     );
  //     if (response.ok) {
  //       navigate('/DeliveryChallanNonReturnales')
  //     } else {
  //       // Handle failure
  //     }
  //   } catch (error) {
  //     console.error("Error posting data:", error);
  //   }
  // };

  //GET Method For ADD Items
  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.223:8080/api/POLIst/getAllPoList/${props.newPRId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("I am from Purchase Add item  " + data);
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSoNrDoc = () => {};

  const handleEdit = (poId) => {
    // const selectedItem = tableDataForm[index];
    // console.log("i am from Purchase List Form "+ selectedItem.poListId)
    setSelectedItemId(poId); //Set the selected item ID

    // Populate the form fields with the data of the selected row
    // initialValues.serviceNumber = selectedItem.serviceNumber;
    // initialValues.description = selectedItem.description;
    // initialValues.rate = selectedItem.rate
    // initialValues.hSNC = selectedItem.hSNC;
    // initialValues.amount = selectedItem.amount;
    // initialValues.status = selectedItem.status;
    // initialValues.remarks = selectedItem.remarks;

    // setEditIndex();
    setEditMode(true);
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
  ];

  const handleDelete = (index) => {
    const updatedData = [...tableDataForm];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  const initialValues = {
    materialNo: "",
    description: "",
    quantity: "",
    rate: "",
    hSNC: "",
    amount: "",
    // status: "",
  };

  //Form Validations
  const checkoutSchema = yup.object().shape({
    materialNo: yup
      .string()
      .matches(/^\d+$/, "Material No must contain only digits")
      .min(3, "Material No must be at least 3 digit")
      .max(7, "Material No must be at most 6 digits")
      .required("Required"),

    description: yup
      .string()
      .max(100, "Description must be at most 100 characters")
      .required("Required"),

    quantity: yup
      .string()
      .max(20, "Quantity should be at most 20 digits")
      .required("Required"),

    hSNC: yup
      .string()
      .matches(/^\d+$/, "HAS/SAC must contain only digits")
      .min(3, "HAS/SAC must be at least 3 digit")
      .max(10, "Quantity should be at most 10 digits")
      .required("HAS/SAC is required"),

    rate: yup
      .string()
      .max(20, "Rate should be at most 20 digits")
      .required("Amount is required"),
  });

  return (
    <Box m="20px">
      <Formik
        onSubmit={handleFormSubmitforPR}
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
          setFieldValue,
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
              {/* Form fields here... */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Material No"
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
                label="HSN/SAC No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hSNC}
                name="hSNC"
                autoComplete="off"
                error={!!touched.hSNC && !!errors.hSNC}
                helperText={touched.hSNC && errors.hSNC}
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
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  const newQty = e.target.value;
                  const newAmount = newQty * values.rate;
                  setFieldValue("amount", newAmount);
                }}
                value={values.quantity}
                name="quantity"
                autoComplete="off"
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
                onChange={(e) => {
                  handleChange(e);
                  const newRate = e.target.value;
                  const newAmount = newRate * values.quantity;
                  setFieldValue("amount", newAmount);
                }}
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
                disabled
                value={values.amount}
                name="amount"
                sx={{ gridColumn: "span 1" }}
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

              {/* <input type="hidden" name="saleorderId" value={saleorderId} /> */}
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
      {/* Table display here... */}
      <TableContainer component={Paper} mt={4}>
        <Table>
          <TableHead style={{ backgroundColor: "#4379BF" }}>
            <TableRow>
              <TableCell>Material No</TableCell>
              <TableCell>HSN/SAC</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Amount</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableDataForm.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.materialNo}</TableCell>
                <TableCell>{row.hSNC}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.amount}</TableCell>

                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="secondary"
                      onClick={() => handleEdit(row.poListId)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(index)}
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
      {/* <Box mt="20px">
      <Button type="submit" color="secondary" variant="contained" onClick={handlePostData} className="convertDcOne">Convert To DC</Button>
      <Button type="submit" color="secondary" variant="contained" className="convertDcOne" onClick={handleSoNrDoc}>So Doc</Button> */}

      {/* <a href='C:\Users\umesh reddy\Downloads\package-lock (3)\SoReturnableDoc.jsx' target="_blank" rel="noopener noreferrer">Open Document</a> */}

      {/* </Box> */}

      {/* <div>
           <SoReturnablesDocs />
      </div> */}
    </Box>
  );
};

export default PurchaseRequestListForm;
