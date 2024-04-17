import React from "react";
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";

const Banking = () =>{

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    const initialValues = {
        Account_No: "",
        Bank_Name: "",
        email: "",
        contact: "",
        Address: "",
    };
    const checkoutSchema = yup.object().shape({
        Account_No:yup.string().required("Required"),
        Bank_Name:yup.string().required("Required"),
        email:yup.string().email("Invalid email!").required("Required"),
        contact:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
        Address:yup.string().required("Required"),

    })

    return(
        <Box m="20px">
        <Header title="CREATE BANKDETAILS" subtitle="Create a New Banking Details" />
  
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
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
                  label="Account_No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Account_No}
                  name="Account_No"
                  error={!!touched.Account_No && !!errors.Account_No}
                  helperText={touched.Account_No && errors.Account_No}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Bank_Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Bank_Name}
                  name="Bank_Name"
                  error={!!touched.Bank_Name && !!errors.Bank_Name}
                  helperText={touched.Bank_Name && errors.Bank_Name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address}
                  name="Address"
                  error={!!touched.Address && !!errors.Address}
                  helperText={touched.Address && errors.Address}
                  sx={{ gridColumn: "span 4" }}
                />
                
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create Bank Details
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
}

export default Banking;