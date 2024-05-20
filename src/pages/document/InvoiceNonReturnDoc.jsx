/** @format */

import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Box, Button } from "@mui/material";
import swal from "sweetalert";
import FacebookCircularProgress from "../../Buffers/AllBuffers";

const InvoiceNonReturnDoc = (props) => {
  const [tablpdfeData, setpdfTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.223:8080/api/SoItems/getsaleItems/${props.newSaleOrderNRId}`
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

  const postPdf = async () => {
    try {
      setLoading(true);
      const pdfBlob = await generatePdf();

      const formData = new FormData();
      formData.append("pdfFile", pdfBlob, "DcInvoice.pdf");
      console.log("i am from PDF " + formData);
      const response = await fetch(
        "http://192.168.29.223:8080/api/NRinvoice/saveNRinvoice",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to store PDF in backend");
      }
      setLoading(false);
      swal("Success", "PDF stored in backend successfully!", "success");
    } catch (error) {
      console.error("Error storing PDF in backend:", error);
      setLoading(false);
      swal("Error", "Failed to store PDF in backend", "error");
    }
  };

  return (
    <>
      <div className="outer-border" id="PurchaseRequestDoc">
        {/* Your PDF content */}
        <table>
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
                    <strong>Invoice No: </strong>
                    <br />
                    <strong>Invoice Date: </strong>
                    <br />
                    <strong>State: </strong>
                    <br />
                    <strong>State Code: </strong>
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
                    <strong>Name:MITSUBISHI ELEVATOR INDIA PVT LTD </strong>
                    <br />
                    <span>LALA 1 LANDMARK, 4TH FLOOR,402,M.G</span>
                    <br />
                    <span>ROAD,RANIGUNJ.SECUNDRABAD</span>
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
                    DC NO:
                    <br />
                    PO NO: <br />
                    Lift NO: <br />
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
                      <th width="3%">S.no</th>
                      <th width="21%">Material No</th>
                      <th width="60%">Product</th>
                      <th width="10%">HSN/SAC</th>
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
                        <td>{material.materialNo}</td>
                        <td>{material.description}</td>
                        <td>{material.hsnSac}</td>
                        <td>{material.quantity}</td>
                        <td>{material.size}</td>
                        <td>{material.rate}</td>
                        <td>{material.amount}</td>
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
                    Bank Name: <br />
                    Bank A/C:
                    <br />
                    IFSC Code:{" "}
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
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={postPdf}
        >
          Conform {loading && <FacebookCircularProgress />}
        </Button>
      </Box>
    </>
  );
};

export default InvoiceNonReturnDoc;
