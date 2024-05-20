import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Box, Button } from "@mui/material";
import html2canvas from 'html2canvas';
import swal from "sweetalert";
import FacebookCircularProgress from "../../Buffers/AllBuffers";

const ReturnableInvoice = (props) => {
  const [tablpdfeData, setpdfTableData] = useState([]);
  const [tableonepdfReturnable, setTableonepdfRetuenabe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click

  useEffect(() => {
    fetchData1();
    fetchData();
    // fetchingInvoiceNumber();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.223:8080/api/SoRetItems/getsaleItems/${props.newsaleorderRIdInvo}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setpdfTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.223:8080/api/Rinvoice/soid/${props.newsaleorderRIdInvo}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTableonepdfRetuenabe(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Getting Invoice Number
  // const fetchingInvoiceNumber = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://192.168.29.223:8080/api/Rinvoice/${props.newsaleorderRIdInvo}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const data = await response.json();
  //     setInvoiceNumberR(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const generatePdf = () => {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF();
      doc.html(document.querySelector("#PurchaseRequestDoc"), {
        callback: function (pdf) {
          const blob = pdf.output("blob");
          resolve(blob);
        },
      });
    });
  };

  const postPdfOne = async () => {
    try {
        const formData = new FormData();

        // Loop through each object in the tableonepdfReturnable array
        for (const item of tableonepdfReturnable) {
            console.log('Processing item:', item);
            
            const pdfBlob = await generatePdf();
            console.log('Generated PDF Blob:', pdfBlob);

            if (!(pdfBlob instanceof Blob)) {
                throw new Error('generatePdf did not return a Blob');
            }

            formData.append('invoicepdf', pdfBlob, `DcInvoice_${item.invoiceId}.pdf`);
            formData.append('invoiceIds[]', item.invoiceId);
        }

        console.log('FormData before sending:', formData);

        // Post the aggregated data in a single request
        const response = await fetch('http://192.168.29.223:8080/api/Rinvoice/updateInvoices', {
            method: 'POST',
            body: formData,
        });

        console.log('Server response:', response);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to store PDFs in backend: ${errorMessage}`);
        }

        setButtonClicked(true); // Set the buttonClicked state to true after clicking the button
        swal('Success', 'PDFs stored in backend successfully!', 'success');
    } catch (error) {
        console.error('Error storing PDFs in backend:', error);
        swal('Error', 'Failed to store PDFs in backend', 'error');
    }
};



  return (
    <>
      {tableonepdfReturnable.map((item, index) => (
        <div key={index} className="outer-border" id={`PurchaseRequestDoc-${index}`}>
          {/* Your PDF content */}
          {/* Add your PDF content here */}
          <table>
            {/* PDF content goes here */}
            <tbody>
            <tr>
              <td colSpan="12">
                <div
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontFamily: "sans-serif",
                  }}
                >
                  <h6 className="header">
                    TAX INVOICE <br />
                    <span
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: "25px",
                        fontWeight: "1300",
                      }}
                    >
                      M.A.PATRAWALA & CO.{" "}
                    </span>
                    <br />
                    <span
                      style={{ fontFamily: "sans-serif", fontSize: "12px" }}
                      className="GstinNo"
                    >
                      Engineers & Contractors
                    </span>
                    <br />
                    <span style={{ fontFamily: "sans-serif", fontSize: "12" }}>
                      Plot No:61,D No:5/9/285/6/1, RagivGandhi Nagar,
                    </span>
                    <br />
                    <span
                      style={{ fontFamily: "sans-serif", fontSize: "12px" }}
                    >
                      Kukatpally,Hyd-500072
                    </span>
                    <br />
                    <span
                      style={{ fontFamily: "sans-serif", fontSize: "12px" }}
                    >
                      Ph.No. 91402371717, 48510818
                    </span>
                    <br />
                    <span>GSTIN:36AGGPP7474F1Z1</span>
                  </h6>
                </div>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <div align="left" style={{ color: "black" }}>
                  <p id="name" className="inNo">
                    <strong>Invoice No:  {item.invoiceNo} </strong>
                    <br />
                    <strong>Invoice Date: </strong>{item.deliveryDate}
                    <br />
                    <strong>State: </strong> Telangana
                    <br />
                    <strong>State Code: </strong>36
                  </p>
                </div>
              </td>
              <td width="40%">
                <div align="left" style={{ color: "black" }}>
                  <p id="voucherNo">
                    <strong>Vehicle No: </strong>
                    {props.newPRId}
                    <br />
                    <strong>Place of Supply: </strong> TELANGANA
                  </p>
                </div>
              </td>
            </tr>

            <h5 style={{ color: "black" }} className="billNoStyle">
              <strong>Details of Reciver/ Billed to :</strong>
            </h5>

            <tr>
              <td width="30%">
                <div align="left" style={{ color: "black" }}>
                  <p id="name" className="namestytle">
                    <strong>Name: </strong>{item.sretOrder.companyName}
                    {/* <br />
                    <span>LALA 1 LANDMARK, 4TH FLOOR,402,M.G</span>
                    <br />
                    <span>ROAD,RANIGUNJ.SECUNDRABAD</span> */}
                  </p>

                  <p id="name">
                    <strong className="gstInStyle">GSTIN: </strong>
                    36AGGPP7474F1Z1
                    <br />
                    <strong>State:</strong>TELANGANA
                    <br />
                    <strong>State Code: </strong>36
                  </p>
                </div>
              </td>
              <td width="40%">
                <div align="left" style={{ color: "black" }}>
                  <p className="namestytle">
                    DC NO: {tableonepdfReturnable.saleorderRetId}
                    <br />
                    PO NO: {item.sretOrder.poNo}<br />
                    Lift NO:{item.liftNo} <br />
                    Way Bill No:
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="12">
                <table>
                  <tbody>
                    <tr style={{ color: "black" }}>
                      <th width="1%">S.no</th>
                      <th width="25%">Service No</th>
                      <th width="60%">Product</th>
                      <th width="9%">HSN/SAC</th>
                      <th width="10%">Qty</th>
                      <th width="15%">Length mm</th>
                      <th width="15%">Rate</th>
                      <th width="15%">Amount</th>
                      <th width="20%">CGST %</th>
                      <th width="20%">SGST %</th>
                      <th width="20%">IGST %</th>
                    </tr>
                    {tablpdfeData.map((material, index) => (
                      <tr
                        key={index}
                        style={{ textAlign: "center", color: "black" }}
                      >
                        <td>{index + 1}</td>
                        <td>{material.serviceNumber}</td>
                        <td>{material.description}</td>
                        <td>{material.hsnSac}</td>
                        <td>{material.quantity}</td>
                        <td>{material.size}</td>
                        <td>{material.rate}</td>
                        <td>{material.amount}</td>
                        <td>9.00</td>
                        <td>9.00</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td width="60%">
                <div align="left" style={{ color: "black" }} className="amount">
                  <p id="name">
                    <strong>Amount Inwords: </strong>
                  </p>
                  <p id="name">
                    <strong>Bank Details</strong>
                    <br />
                    Bank Name: Union Bank of India <br />
                    Bank A/C:510101001857923
                    <br />
                    IFSC Code: UBIN0911666{" "}
                  </p>
                </div>
              </td>
              <td width="40%">
                <div align="left" style={{ color: "black" }}>
                  <p>
                    Total Amount Before Tax: <br />
                    Add:CGST: <br />
                    Add:SGST: <br />
                    Add:IGST- <br />
                    Advance: <br />
                    <strong>Total Amount After Tax </strong>
                    <br />
                    <strong>For M A PATRAWALA & CO</strong>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
      ))}
      {!buttonClicked && (
        // Conditionally render the button based on the buttonClicked state
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={postPdfOne}
          >
            Confirm {loading && <FacebookCircularProgress />}
          </Button>
        </Box>
      )}
    </>
  );
};

export default ReturnableInvoice;
