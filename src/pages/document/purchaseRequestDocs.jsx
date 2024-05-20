/** @format */

import React, { useEffect, useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import { Button } from "@mui/material";

const PurchaseRequestDocs = (props) => {
  const [materials, setMaterials] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [tableDatapR, setTableDataPr] = useState([]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await fetch(
        "http://192.168.29.223:8080/api/Porequest/allitems"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTableDataPr(data);

      setDataLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataLoading(false);
    }
  };

  useState(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.223:8080/api/POLIst/getAllPoList/${props.newPRId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      //   setName(data.name);
      //   setVoucherNo(data.voucherNo);
      //   setDate(data.date);
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generatePdf = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#PurchaseRequestDoc"), {
      callback: function (pdf) {
        pdf.save("purchaseRequestDoc.pdf");
      },
    });
  };

  return (
    <>
      <Button
        onClick={generatePdf}
        color="success"
        className="btn btn-primary"
        style={{ textAlign: "left" }}
      >
        <PrintIcon />
      </Button>
      <div className="outer-border" id="PurchaseRequestDoc">
        <table>
          <tbody>
            <tr>
              <td colSpan="12">
                <div style={{ textAlign: "center", color: "black" }}>
                  <h1 className="header">
                    M A PATRAWALA & CO <br />
                    MATERIAL PURCHASE REQUEST
                  </h1>
                </div>
                {/* <div className="subheader" style={{ textAlign: 'center',color:"black" , fontFamily:"sans-serif"}}>
                <h3>MATERIAL PURCHASE REQUEST</h3>
              </div> */}
              </td>
            </tr>
            <tr>
              <td width="60%">
                <div align="left" style={{ color: "black" }}>
                  <p id="name" className="purchaseName">
                    <strong>Name: </strong>
                    {props.newCompanyName}
                  </p>
                </div>
              </td>
              <td width="40%">
                <div align="left" style={{ color: "black" }}>
                  <p id="voucherNo">
                    <strong>Voucher No: </strong>
                    {props.newPRId} <br />
                    Date:
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="12">
                <table>
                  <tbody>
                    <tr style={{ color: "black" }}>
                      <th width="4%">S.no</th>
                      <th width="20%">Material No</th>
                      <th width="8%">UOM</th>
                      <th width="8%">Qty</th>
                      <th width="8%">Rate</th>
                      <th width="8%">Gross</th>
                      <th width="20%">Remarks</th>
                    </tr>
                    {materials.map((material, index) => (
                      <tr
                        key={index}
                        style={{ textAlign: "center", color: "black" }}
                      >
                        <td>{index + 1}</td>
                        <td>{material.materialNo}</td>
                        <td>{material.uom}</td>
                        <td>{material.quantity}</td>
                        <td>{material.rate}</td>
                        <td>{material.gross}</td>
                        <td>{material.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="8">
                <p
                  style={{
                    display: "inline",
                    textAlign: "left",
                    marginRight: "100px",
                    color: "black",
                    paddingBottom: "30px",
                  }}
                >
                  Narration:
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan="8">
                <div className="footer">
                  <p
                    style={{
                      display: "inline",
                      marginRight: "45px",
                      color: "black",
                    }}
                  >
                    Requested by:{" "}
                  </p>
                  <p
                    style={{
                      display: "inline",
                      marginRight: "100px",
                      color: "black",
                      marginLeft: "20px",
                    }}
                  >
                    Verified by:
                  </p>
                  <p
                    style={{
                      display: "inline",
                      textAlign: "right",
                      marginRight: "100px",
                      color: "black",
                    }}
                  >
                    Approval:
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PurchaseRequestDocs;
