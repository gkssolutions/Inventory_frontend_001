/** @format */

import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useNavigate } from "react-router-dom";
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // State variables to hold count values
  const [salesOrderReturnableCount, setSalesOrderReturnableCount] = useState(0);
  const [salesOrderNonReturnableCount, setSalesOrderNonReturnableCount] =
    useState(0);
  const [numberOfDCCount, setNumberOfDCCount] = useState(0);
  const [numberOfNonDcCount, setNumberOfNonDcCount] = useState(0);

  // Total possible count (you need to define this variable)
  const totalPossibleCount = 1000; // Example value, replace with actual total possible count

  useEffect(() => {
    // Function to fetch data for sales order returnable count from backend API
    const fetchSalesOrderReturnableCount = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.223:8080/Dashboard/sale/count"
        );
        const data = await response.json();
        setSalesOrderReturnableCount(data);
      } catch (error) {
        console.error("Error fetching sales order returnable count:", error);
      }
    };

    // Function to fetch data for sales order non-returnable count from backend API
    const fetchSalesOrderNonReturnableCount = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.223:8080/Dashboard/salenr/count"
        );
        const data = await response.json();
        setSalesOrderNonReturnableCount(data);
        console.log(data + "  I am from dashboard");
      } catch (error) {
        console.error(
          "Error fetching sales order non-returnable count:",
          error
        );
      }
    };

    // Function to fetch data for number of DC from backend API
    const fetchNumberOfDCCount = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.223:8080/Dashboard/dcr/count"
        );
        const data = await response.json();
        setNumberOfDCCount(data);
      } catch (error) {
        console.error("Error fetching number of DC count:", error);
      }
    };

    // Function to fetch data for number of invoices from backend API
    const fetchNumberOfNonDcCount = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.223:8080/Dashboard/dcnr/count"
        );
        const data = await response.json();
        setNumberOfNonDcCount(data);
      } catch (error) {
        console.error("Error fetching number of invoices count:", error);
      }
    };

    // Call the fetch functions when component mounts
    fetchSalesOrderReturnableCount();
    fetchSalesOrderNonReturnableCount();
    fetchNumberOfDCCount();
    fetchNumberOfNonDcCount();
  }, []);

  const navigateToList = () => {
    navigate("/saleOrderReturnList");
  };

  const navigateToNrList = () => {
    navigate("/SaleOrderNRlist");
  };

  const navigateToReturnDc = () => {
    navigate("/DeliveryChallanReturnables");
  };

  const navigateToNonDcList = () => {
    navigate("/DeliveryChallanNonReturnales");
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={6} xl={4} onClick={navigateToList}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={salesOrderReturnableCount}
              subtitle="SalesOrder Returnable List"
              progress={(salesOrderReturnableCount / totalPossibleCount) * 100} // Calculate progress percentage
              increase={
                (
                  (salesOrderReturnableCount / totalPossibleCount) *
                  100
                ).toFixed(2) + "%"
              } // Calculate increase percentage
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={4} onClick={navigateToNrList}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={salesOrderNonReturnableCount}
              subtitle="SalesOrder Non-Returnable List"
              progress={
                (salesOrderNonReturnableCount / totalPossibleCount) * 100
              } // Calculate progress percentage
              increase={
                (
                  (salesOrderNonReturnableCount / totalPossibleCount) *
                  100
                ).toFixed(2) + "%"
              } // Calculate increase percentage
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={4} onClick={navigateToReturnDc}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={numberOfDCCount}
              subtitle="No.of Returnable-DC"
              progress={(numberOfDCCount / totalPossibleCount) * 100} // Calculate progress percentage
              increase={
                ((numberOfDCCount / totalPossibleCount) * 100).toFixed(2) + "%"
              } // Calculate increase percentage
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={4}
          onClick={navigateToNonDcList}
        >
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={numberOfNonDcCount}
              subtitle="No.Of Non-Dc Count"
              progress={(numberOfNonDcCount / totalPossibleCount) * 100} // Calculate progress percentage
              increase={
                ((numberOfNonDcCount / totalPossibleCount) * 100).toFixed(2) +
                "%"
              } // Calculate increase percentage
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
