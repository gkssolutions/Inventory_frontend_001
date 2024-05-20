/** @format */

import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Box, Button } from "@mui/material";
import swal from "sweetalert";

import PrintIcon from "@mui/icons-material/Print";

const SaleReturnablesDCDocs = (props) => {
  console.log("i am Return doc dom " + props.newsaleorderdcId);

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
        `http://192.168.29.223:8080/api/RetDc/geAllbyid/${props.newsaleorderdcId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setpdfTableData(data);
      console.log("i am from the Non R doc umesh ", data);
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
        `http://192.168.29.223:8080/api/SoRetOrders/${props.newsaleorderdcId}`
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

        <div className="outer-borderone" id="SalesOrderDoc">
          {/* Your PDF content */}
          <table>
            <tbody>
              <tr>
                <td colSpan="12">
                  <h4
                    style={{ color: "black", textAlign: "center" }}
                    className="dcStyle"
                  >
                    DELIVERY CHALLAN
                  </h4>
                  <div style={{ display: "flex" }}>
                    <div style={{ color: "black" }}>
                      <p className="addressStyle">
                        <b className="patraname">M.A.PATRAWALA & CO.</b>
                        <br />{" "}
                        <strong className="costyles">
                          Engineers & Contractors
                        </strong>
                        <br />{" "}
                        <strong className="allkindstyle ,info-container">
                          All Kind of Engineering & Fabrication
                          Works,Specialized in :<br /> Elevator Brackets,Heavy
                          Structures, Steel Scaffolding & Repair of Machinery
                          Parts.
                        </strong>
                      </p>
                    </div>
                    <div style={{ color: "black" }} className="plotStyle">
                      <p className="info-container">
                        Plot No: 61, D No: 5/9/285/6/1,
                        <br />
                        Rajiv Gandhi Nagar , Kukatpally ,Hyd-500072
                        <br />
                        Email : mapatrawala014 @gmail.com
                        <br /> Phone: 040-23071717
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    <div>
                      <p className="info-container">DC No: 186</p>
                    </div>
                    <div>
                      <p
                        style={{ fontWeight: "bold" }}
                        className="info-container"
                      >
                        RETURNABLE DELIVERY CHALLAN
                      </p>
                    </div>
                    <div>
                      <p className="info-container">Date: 252520</p>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <div align="left" style={{ color: "black" }}>
                    <p className="addressStyle">
                      <b>TO,</b>
                      <br />
                      <br />
                    </p>
                    <p className="info-container">
                      <b>Site:</b>
                    </p>
                  </div>
                </td>
                <td width="40%">
                  <div align="left" style={{ color: "black" }}>
                    <p>
                      Job No <br />
                      PO NO : {tablDataeData.poNo}
                      <br />
                      Vehicle No <br />
                      Lift No
                    </p>
                  </div>
                </td>
              </tr>

              {/* <h4 style={{color:"black", fontFamily:'sans-serif'}} className='billNoStyle'><strong>NON-RETURNABLE SALES ORDER</strong></h4> */}

              {/* <tr >
            <td width="30%">
              <div align="left" style={{color:"black"}} >
               
               
                <p id="name" className="projectNameStyle"><strong>Project Name:</strong>{tablDataeData.projectName}<br/><strong>PO No:</strong>{tablDataeData.poNo}<br/><strong>Contact Number: </strong>{tablDataeData.projectUnitNo}<br/><strong>Project Unit No:</strong>{tablDataeData.projectUnitNo}<br/><strong>Email ID:</strong>{tablDataeData.emailId}</p>
                
              </div>
            </td>
            <td width="40%">
              <div align="left" style={{color:"black"}}>
                <p className='namestytle'><strong>Date:</strong>{tablDataeData.deliveryDate}<br/><strong>SO Created Date:</strong>{tablDataeData.soCreatedDate} <br/><strong>Approval Status:</strong> {tablDataeData.status}</p>
                
              </div>
            </td>
            

          </tr> */}

              <tr>
                <td colSpan="12">
                  <div>
                    <h6
                      style={{ color: "black", fontFamily: "sans-serif" }}
                      className="billNoStyle"
                    >
                      Please recive the following materials good condition
                    </h6>
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="12">
                  <table>
                    <tbody>
                      <tr style={{ color: "black" }}>
                        <th width="3%">S.no</th>
                        {/* <th width="18%">Material No</th>
                   
                    <th width="10%">HSN/SAC</th> */}
                        <th width="40%">Material No</th>
                        <th width="40%">HSN/SAC</th>
                        <th width="40%">Descriprtion</th>
                        <th width="10%">Size</th>
                        <th width="10%">Quantity</th>
                        <th width="10%">Remarks</th>
                        {/*                     
                    <th width="10%">Amount</th>
                    <th width="20%">Status</th> */}
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
                          {/* <td>{material.materialNo}</td>
                      
                      <td>{material.hsnSac}</td> */}
                          <td>{material.materialNo}</td>
                          <td>{material.hsnSac}</td>
                          <td>{material.description}</td>
                          <td>{material.size}</td>
                          <td>{material.quantity}</td>
                          <td>{material.remarks}</td>
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
                  marginRight: "310px",
                  color: "black",
                  paddingTop: "10px",
                  fontSize: "13px",
                }}
              >
                Receiver's Name:{" "}
              </p>
            </div>
            {/* <div>
              <p
                style={{
                  display: "inline",
                  marginRight: "90px",
                  color: "black",
                  marginTop: "50px",
                  
                }}
              >
                Security Signature:{" "}
              </p>
            </div> */}
            <div>
              <p
                style={{
                  display: "inline",
                  // textAlign: "right",
                  // marginRight: "100px",
                  marginTop: "50px",
                  color: "black",
                  fontSize: "10px",
                  fontWeight: "5px",
                }}
              >
                MAP PATRAWALA & CO <br />
                ENGINEERING CONTRACTOR:{" "}
              </p>
            </div>
          </div>
          <div className="footer" style={{ display: "flex" }}>
            <div>
              <p
                style={{
                  display: "inline",
                  // textAlign: "left",
                  marginRight: "100px",
                  color: "black",
                  paddingTop: "10px",
                  fontSize: "13px",
                }}
              >
                Receiver's Signature:{" "}
              </p>
            </div>
            <div>
              <p
                style={{
                  display: "inline",
                  marginRight: "90px",
                  color: "black",
                  marginTop: "50px",
                }}
              >
                Security Signature:{" "}
              </p>
            </div>
            <div>
              <p
                style={{
                  display: "inline",
                  // textAlign: "right",
                  // marginRight: "100px",

                  color: "black",
                  fontSize: "10px",
                  fontWeight: "5px",
                }}
              >
                Authoried Signature
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

export default SaleReturnablesDCDocs;
