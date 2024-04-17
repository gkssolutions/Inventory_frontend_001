import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';

const BOQ = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const [showList, setShowList] = useState(false); // State to control whether to show the list

    const handleFormSubmit = (values) => {
        console.log(values);
        // Submit logic goes here
    };

    const initialValues = {
        sno: '',
        description: '',
        size: '',
        quantity: '',
        remarks: '',
        toSite: '',
        status: '',
    };

    const checkoutSchema = yup.object().shape({
        sno: yup.string().required('Required'),
        description: yup.string().required('Required'),
        size: yup.string().required('Required'),
        quantity: yup
            .number()
            .typeError('Quantity must be a number')
            .positive('Quantity must be positive')
            .integer('Quantity must be an integer')
            .required('Required'),
        remarks: yup.string().required('Required'),
        toSite: yup.string().required('Required'),
        status: yup.string().required('Required'),
    });

    const handleShowList = () => {
        // Logic to show the list
        setShowList(true);
    };

    return (
        <Box m="20px">
            <Header title="CREATE BOQ" subtitle="Create a New Boq" />

            

            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="S.no"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.sno}
                                name="sno"
                                error={!!touched.sno && !!errors.sno}
                                helperText={touched.sno && errors.sno}
                                sx={{ gridColumn: 'span 2' }}
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
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Size"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.size}
                                name="size"
                                error={!!touched.size && !!errors.size}
                                helperText={touched.size && errors.size}
                                sx={{ gridColumn: 'span 1' }}
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
                                sx={{ gridColumn: 'span 1' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Remarks"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.remarks}
                                name="remarks"
                                error={!!touched.remarks && !!errors.remarks}
                                helperText={touched.remarks && errors.remarks}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="To Site"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.toSite}
                                name="toSite"
                                error={!!touched.toSite && !!errors.toSite}
                                helperText={touched.toSite && errors.toSite}
                                sx={{ gridColumn: 'span 2' }}
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
                                sx={{ gridColumn: 'span 2' }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt="20px">
                            <Button onClick={handleShowList} color="secondary" variant="contained">
                                Create BOQ
                            </Button>
                            <Button type="submit" color="secondary" variant="contained">
                                Submit
                            </Button>
                            
                        </Box>
                    </form>
                )}
            </Formik>

            {/* Display the list here based on the showList state */}
            {showList && (
                <Box mt={4}>
                    {/* Implement the list display component or logic here */}
                    <h2>List of BOQ Entries</h2>
                    <p>List items go here...</p>
                </Box>
            )}
        </Box>
    );
};

export default BOQ;
