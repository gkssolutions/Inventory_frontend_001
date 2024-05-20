/** @format */

import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Box, Button } from "@mui/material";
import swal from "sweetalert";

import PrintIcon from "@mui/icons-material/Print";

const SaleReturnablesDocs = (props) => {
  console.log("i am from doc dom " + props.newsaleorderId);
  const [docData, SetDocData] = useState([]);
  const [tablpdfeData, setpdfTableData] = useState([]);
  const [tablDataeData, setDataTableData] = useState([]);
  const [dataLoading, setpdfDataLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const fetchData = async () => {
    setpdfDataLoading(true);
    try {
      const response = await fetch(
        `http://192.168.29.223:8080/api/SoRetItems/getsaleItems/${props.newsaleorderRId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setpdfTableData(data);
      console.log("i am from the doc 2## ", tablpdfeData);
      setpdfDataLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setpdfDataLoading(false);
    }
  };
  const fetchData2 = async () => {
    setpdfDataLoading(true);
    try {
      const response = await fetch(
        `http://192.168.29.223:8080/api/SoRetOrders/${props.newsaleorderRId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setDataTableData(data);
      console.log("i am from the doc 2## ", tablpdfeData);
      setpdfDataLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setpdfDataLoading(false);
    }
  };

  const generatePdf = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#SalesOrderDoc"), {
      callback: function (pdf) {
        pdf.save("MAPatrawala.pdf");
      },
    });
  };

  // const generatePdf = () => {
  //   var doc = new jsPDF("p", "pt", "a4");
  //   doc.html(document.querySelector("#SalesOrderDoc"), {
  //     callback: function (pdf) {
  //       pdf.save("MAPatrawala.pdf");
  //     },
  //   });
  // };

  return (
    <>
      <div>
        <Button
          onClick={generatePdf}
          color="success"
          className="btn btn-primary"
        >
          <PrintIcon />
        </Button>

        <div className="outer-borderreturnSaleList" id="SalesOrderDoc">
          {/* Your PDF content */}
          <table>
            <tbody>
              <tr>
                <td colSpan="12">
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      display: "flex",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <img
                        alt="profile user"
                        width="90px"
                        height="90px"
                        src={"../../assets/patrawalaLogo.jpg"}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                        className="headeroner"
                      />
                    </div>
                    <div>
                      <h1 className="header">
                        M.A.PRATRAWALA & CO
                        <br />
                        <span
                          style={{
                            color: "f40605",
                            fontFamily: "slabo",
                            fontSize: "15px",
                          }}
                        >
                          Engineers & Contractors
                        </span>
                      </h1>
                    </div>
                    <br />
                  </div>
                </td>
              </tr>
              <tr>
                <td width="40%">
                  <div align="left" style={{ color: "black" }}>
                    <p className="addressStyle">
                      <b>Address:</b> PlotNO.61,D.No.5/9/285/6/1,
                      <br /> Ragiv GandhiNagar,I.E.kukatpally
                      <br /> Hyderabad -500072,Telangana,India
                    </p>
                    <p>
                      <b>Telephone No:</b> +91 4048510818
                      <br />
                      <strong>Email Id</strong>:mapatrawala014@gmail.com
                    </p>
                  </div>
                </td>
                <td width="40%">
                  <div align="left" style={{ color: "black" }}>
                    <p>
                      <b>GST REG NO:</b>345345345
                      <br />
                      <strong>IEC Code No</strong>: <br />
                      <strong>CIN</strong>:<br />
                      <strong>PAN No:</strong>
                    </p>
                  </div>
                </td>
              </tr>

              <h4
                style={{ color: "black", fontFamily: "sans-serif" }}
                className="billNoStyle"
              >
                <strong>RETURNABLE SALES ORDER</strong>
              </h4>

              <tr>
                <td width="30%">
                  <div align="left" style={{ color: "black" }}>
                    <p id="name" className="projectNameStyle">
                      <strong>Project Name:</strong>
                      {tablDataeData.projectName}
                      <br />
                      <strong>PO No:</strong>
                      {tablDataeData.poNo}
                      <br />
                      <strong>Contact Number: </strong>
                      {tablDataeData.projectUnitNo}
                      <br />
                      <strong>Project Unit No:</strong>
                      {tablDataeData.projectUnitNo}
                      <br />
                      <strong>Email ID:</strong>
                      {tablDataeData.emailId}
                    </p>
                  </div>
                </td>
                <td width="40%">
                  <div align="left" style={{ color: "black" }}>
                    <p className="namestytle">
                      <strong>Date:</strong>
                      {tablDataeData.deliveryDate}
                      <br />
                      <strong>SO Created Date:</strong>
                      {tablDataeData.soCreatedDate} <br />
                      <strong>Approval Status:</strong> {tablDataeData.status}
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
                        <th width="18%">Service No</th>

                        <th width="10%">HSN/SAC</th>
                        <th width="40%">Descriprtion</th>
                        <th width="10%">Qty</th>

                        <th width="10%">Amount</th>
                        <th width="20%">Status</th>
                      </tr>
                      {tablpdfeData.map((material, index) => (
                        <tr
                          key={index}
                          style={{
                            textAlign: "center",
                            color: "black",
                            fontFamily: "sans-serif",
                          }}
                        >
                          <td>{index + 1}</td>
                          <td>{material.serviceNumber}</td>

                          <td>{material.hsnSac}</td>
                          <td>{material.description}</td>
                          <td>{material.quantity}</td>

                          <td>{material.amount}</td>
                          <td>{material.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="footer" style={{ display: "flex" }}>
            <div>
              <p
                style={{
                  display: "inline",
                  // textAlign: "left",
                  marginRight: "120px",
                  color: "black",
                  paddingTop: "10px",
                  fontSize: "13px",
                }}
              >
                Prepared by:{" "}
              </p>
            </div>
            <div>
              <p
                style={{
                  display: "inline",
                  marginRight: "120px",
                  color: "black",
                  marginTop: "50px",
                }}
              >
                Checked by:{" "}
              </p>
            </div>
            <div>
              <p
                style={{
                  display: "inline",
                  // textAlign: "right",
                  // marginRight: "100px",
                  marginTop: "50px",
                  color: "black",
                }}
              >
                Approved by:{" "}
              </p>
            </div>
          </div>
        </div>
        {/* <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained" onClick={postPdf}>
          Conform {loading && <FacebookCircularProgress />}
        </Button>
      </Box> */}
      </div>
    </>
  );
};

export default SaleReturnablesDocs;
