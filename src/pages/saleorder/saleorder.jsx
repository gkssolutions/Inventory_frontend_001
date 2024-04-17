import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";

const SaleOrder = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [error, setError] = useState(null);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch('http://localhost:8088/api/SoOrders/SoSave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            resetForm();
            setError(null);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Failed to submit form');
        }
    };

    const initialValues = {
        itemsId: "",
        materialNo: "",
        hsnSac: "",
        description: "",
        quantity: "",
        rate: "",
        status: "",
    };

    const checkoutSchema = yup.object().shape({
        itemsId: yup.string().required("Items ID is required"),
        materialNo: yup.string().required("Material No is required"),
        hsnSac: yup.string().required("HSN/SAC is required"),
        description: yup.string().required("Description is required"),
        quantity: yup.number().positive("Quantity must be a positive number").required("Quantity is required"),
        rate: yup.number().positive("Rate must be a positive number").required("Rate is required"),
        status: yup.string().required("Status is required"),
    });

    return (
        <Box m="20px">
            <Header title="CREATE SALES ORDER" subtitle="Create a New SaleOrder" />

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
                                label="Items ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.itemsId}
                                name="itemsId"
                                error={!!touched.itemsId && !!errors.itemsId}
                                helperText={touched.itemsId && errors.itemsId}
                                sx={{ gridColumn: "span 2" }}
                            />
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
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="HSN/SAC"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.hsnSac}
                                name="hsnSac"
                                error={!!touched.hsnSac && !!errors.hsnSac}
                                helperText={touched.hsnSac && errors.hsnSac}
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
                                label="Quantity"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.quantity}
                                name="quantity"
                                error={!!touched.quantity && !!errors.quantity}
                                helperText={touched.quantity && errors.quantity}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Rate"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.rate}
                                name="rate"
                                error={!!touched.rate && !!errors.rate}
                                helperText={touched.rate && errors.rate}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Status"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.status}
                                name="status"
                                error={!!touched.status && !!errors.status}
                                helperText={touched.status && errors.status}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Submit
                            </Button>
                        </Box>
                        {error && <Box mt={2} color="error.main">{error}</Box>}
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default SaleOrder;
 