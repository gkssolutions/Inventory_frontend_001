import React, { useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";

const Item = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [items, setItems] = useState([]);
    
    const handleFormSubmit = (values) => {
        const amount = values.QTY * values.Rate * (1 + values.Tax / 100);
        setItems(prevItems => [...prevItems, { ...values, Amount: amount }]);
    };

    const initialValues = {
        id: "",
        description: "",
        UOM: "",
        QTY: "",
        Rate: "",
        Tax: "",
        Amount: "",
    };

    const checkoutSchema = yup.object().shape({
        id: yup.string().required("Required"),
        description: yup.string().required("Required"),
        UOM: yup.string().required("Required"),
        QTY: yup.number().positive("QTY must be a positive number").required("Required"),
        Rate: yup.number().positive("Rate must be a positive number").required("Required"),
        Tax: yup.number().positive("Tax must be a positive number").required("Required"),
    });

    return (
        <Box m="20px">
            <Header title="CREATE ITEM" subtitle="Create a New Item" />

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
                                label="ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.id}
                                name="id"
                                error={!!touched.id && !!errors.id}
                                helperText={touched.id && errors.id}
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
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="UOM"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.UOM}
                                name="UOM"
                                error={!!touched.UOM && !!errors.UOM}
                                helperText={touched.UOM && errors.UOM}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="QTY"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.QTY}
                                name="QTY"
                                error={!!touched.QTY && !!errors.QTY}
                                helperText={touched.QTY && errors.QTY}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Rate"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Rate}
                                name="Rate"
                                error={!!touched.Rate && !!errors.Rate}
                                helperText={touched.Rate && errors.Rate}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Tax"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Tax}
                                name="Tax"
                                error={!!touched.Tax && !!errors.Tax}
                                helperText={touched.Tax && errors.Tax}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <Box gridColumn="span 4" display="flex" justifyContent="end">
                                <Button type="submit" color="secondary" variant="contained">
                                    Add Item
                                </Button>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
            <Box mt="20px">
                <Header title="ADDED ITEMS" />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>UOM</TableCell>
                                <TableCell>QTY</TableCell>
                                <TableCell>Rate</TableCell>
                                <TableCell>Tax</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.UOM}</TableCell>
                                    <TableCell>{item.QTY}</TableCell>
                                    <TableCell>{item.Rate}</TableCell>
                                    <TableCell>{item.Tax}</TableCell>
                                    <TableCell>{item.Amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default Item;
