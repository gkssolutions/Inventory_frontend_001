import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, InputLabel, FormControl, FormHelperText } from "@mui/material";

import { Swal } from 'sweetalert';


const InvoicesNonReturnableListform = (props) => {
  
  const [tableDataForm, setTableData] = useState([]);
  

  useEffect(() => {
    handleFetchInvoice();
  }, []);

  const handleFetchInvoice = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.223:8080/api/NRetinvoice/6"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("i am new pdf data #Today "+ data)
      // Extract the invoice byte data
      const invoiceByteData = data?.invoiceByteData;
      if (invoiceByteData) {
        // Convert byte array to string
        const binaryString = String.fromCharCode.apply(null, invoiceByteData);
        // Convert binary string to Base64
        const base64Invoice = btoa(binaryString);
        // Now you can use 'base64Invoice' as needed
        console.log(base64Invoice);
      } else {
        // Swal.fire({
        //   icon: 'warning',
        //   title: 'No PDF Found',
        //   text: 'There is no PDF available for this invoice.',
        // });
      }

      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  return (
    <Box m="20px">
      {/* Display the PDF inside an iframe */}
      <iframe
  src={`data:application/pdf;base64,${tableDataForm.invoicepdf}`}
  style={{ width: "100%", height: "500px" }}
  frameBorder="0"
></iframe>


      {/* Your other JSX components */}
    </Box>
  );
};

export default InvoicesNonReturnableListform;
