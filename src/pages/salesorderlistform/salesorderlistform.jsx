import React, { useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SalesOrderListForm = () => {
    const [tableData, setTableData] = useState([]);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values) => {
        try {
            // Assuming the form submission is successful, add the form values to the table data
            setTableData(prevData => [...prevData, values]);
            console.log('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (index) => {
        // Implement edit functionality here if needed
        console.log("Edit clicked for row", index);
    };

    const handleDelete = (index) => {
        // Implement delete functionality here if needed
        console.log("Delete clicked for row", index);
    };

    const initialValues = {
        materialNo: "",
        description: "",
        qty: "",
        amount: "",
    };

    const checkoutSchema = yup.object().shape({
        materialNo: yup.string().required("Material No is required"),
        description: yup.string().required("Description is required"),
        qty: yup.number().positive("Qty must be a positive number").required("Qty is required"),
        amount: yup.number().positive("Amount must be a positive number").required("Amount is required"),
    });

    return (
        <Box m="20px">
            <Header subtitle="List of Sales Order Items" />

            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                                label="Material No"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.materialNo}
                                name="materialNo"
                                error={!!touched.materialNo && !!errors.materialNo}
                                helperText={touched.materialNo && errors.materialNo}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
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
                                label="Qty"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.qty}
                                name="qty"
                                error={!!touched.qty && !!errors.qty}
                                helperText={touched.qty && errors.qty}
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
                                error={!!touched.amount && !!errors.amount}
                                helperText={touched.amount && errors.amount}
                                sx={{ gridColumn: "span 1" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                AddItem
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik><br />
            <TableContainer component={Paper} mt={4}>
                <Table>
                    <TableHead style={{ backgroundColor: 'blue' }}>
                        <TableRow>
                            <TableCell>Material No</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.materialNo}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.qty}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton color="secondary" onClick={() => handleEdit(index)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color="secondary" onClick={() => handleDelete(index)}>
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
    );
}

export default SalesOrderListForm;
