import React, { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useLocation } from "react-router-dom"; // Import useLocation hook

import { useSidebarContext } from "./sidebarContext";

import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SubtitlesOffOutlinedIcon from "@mui/icons-material/SubtitlesOffOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation(); // Get the current location

  // Check if the item's path matches the current pathname
  const isActive = location.pathname === to;

  return (
    <MenuItem
      active={isActive} // Set active state based on the comparison
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  const location = useLocation(); // Get the current location

  // Get the role from local storage after login
  const role = localStorage.getItem("role");

  // Define menu items for each role
  const menuItems = {
    admin: [
      // Add menu items for admin role
      <MenuItem
        icon={
          collapsed ? (
            <MenuOutlinedIcon onClick={() => collapseSidebar()} />
          ) : sidebarRTL ? (
            <SwitchLeftOutlinedIcon
              onClick={() => setSidebarRTL(!sidebarRTL)}
            />
          ) : (
            <SwitchRightOutlinedIcon
              onClick={() => setSidebarRTL(!sidebarRTL)}
            />
          )
        }
        style={{
          margin: "10px 0 20px 0",
          color: colors.grey[100],
        }}
      >
        {!collapsed && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml="15px"
          >
            <Typography variant="h3" color={colors.grey[100]}>
              ADMIN
            </Typography>
            <IconButton
              onClick={
                broken ? () => toggleSidebar() : () => collapseSidebar()
              }
            >
              <CloseOutlinedIcon />
            </IconButton>
           
          </Box>
          
        )}
        
        
      </MenuItem>,
      
      // Add other menu items for admin role
      <Item
        title="Dashboard"
        to="/dashboard"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />,
      <Item
        title="Purchase Request"
        to="/adminPurchaseRequestList"
        icon={<AddShoppingCartIcon />}
        selected={selected}
        setSelected={setSelected}
      />,
          // <Item
          //     title="Reports"
          //     to="/team"
          //     icon={<FormatListBulletedOutlinedIcon />}
          //     selected={selected}
          //     setSelected={setSelected}
          //   />
              ,
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Returnables
            </Typography>,
              <Item
                title="Return-SalesOrder"
                to="/SaleOrderReturnablesForm"
                icon={<AssignmentOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />,
              <Item
              title="SalesOrder Return List"
              to="/saleOrderReturnList"
              icon={<FormatListNumberedRtlIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
              <Item
                title="Returns-BOQ"
                to="/BoqList"
                icon={<TaskOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />,
              
            <Item
              title="Returns-DC"
              to="/DeliveryChallanReturnables"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
            <Item
            title="Returns-Pending"
            to="/PendingReturnables"
            icon={<DescriptionOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />,

            <Item
              title="Return-Invoices"
              to="/InvoicesReturnables"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Non-Returnables
            </Typography>
            ,
            <Item
              title="Sales Order"
              to="/salesorderNonReturnable"
              icon={<AssignmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
            <Item
              title="Sales Order NR List"
              to="/SaleOrderNRlist"
              icon={<FormatListNumberedRtlIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
            /////////////////////////prosidnav/////////////////////////////
            // <Item
            //         title="SO DC AND PNDGS"
            //         to="/sodcpnds"
            //         icon={<ListAltOutlinedIcon />}
            //         selected={selected}
            //         setSelected={setSelected}
            //       />,
            <Item
              title="NonReturns-DC"
              to="/DeliveryChallanNonReturnales"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
            <Item
              title="NonReturns-Pending"
              to="/PendingNonReturnables"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
            <Item
              title="NonReturns-Invoice"
              to="/InvoicesNonReturnables"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              WareHouse
            </Typography>,
            
            <Item
              title="Add Items "
              to="/item"
              icon={<PostAddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />,
            <Item
            title="Purchase Request Form"
            to="/purchaseRequestForm"
            icon={<RequestPageIcon />}
            selected={selected}
            setSelected={setSelected}
          />,
          <Item
              title="Purchase Request List"
              to="/purchaseRequestList"
              icon={<FormatListNumberedRtlIcon />}
              selected={selected}
              setSelected={setSelected}
            />,

            // <Item
            //   title="Material Purchase "
            //   to="/materialPurchase"
            //   icon={<PostAddOutlinedIcon />}
            //   selected={selected}
            //   setSelected={setSelected}
            // />,
            // <Typography
            //   variant="h6"
            //   color={colors.grey[300]}
            //   sx={{ m: "15px 20px 5px 20px" }}
            // >
            //   Rentals
            // </Typography>,
            // <Item
            //   title="Rental List"
            //   to="/form"
            //   icon={<SummarizeOutlinedIcon />}
            //   selected={selected}
            //   setSelected={setSelected}
            // />,
            
            // <Item
            //   title="OnSite List"
            //   to="/calendar"
            //   icon={<ListAltOutlinedIcon />}
            //   selected={selected}  
            //   setSelected={setSelected}
            // />,
            // <Item
            //   title="Closed List"
            //   to="/calendar"
            //   icon={<SubtitlesOffOutlinedIcon />}
            //   selected={selected}
            //   setSelected={setSelected}
            // />,
            // <Item
            //   title="Rental Returns"
            //   to="/calendar"
            //   icon={<KeyboardReturnOutlinedIcon />}
            //   selected={selected}
            //   setSelected={setSelected}
            // />,

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Pages
            </Typography>,
            // <Item
            //   title="Profile Form"
            //   to="/form"
            //   icon={<PersonOutlinedIcon />}
            //   selected={selected}
            //   setSelected={setSelected}
            // />,

            <Item
            title="Mail Service"
            to="/mailService"
            icon={<LocalPostOfficeIcon />}
            selected={selected}
            setSelected={setSelected}
          />,
         
            
          // <Item
          //   title="Logout"
          //   to="/signin"
          //   icon={<PersonOutlinedIcon />}
          //   selected={selected}
          //   setSelected={setSelected}
          // />,
            
            
      // Add other admin menu items here...
    ],
    engineer: [
      // Add menu items for engineer role
      // Define menu items for engineer role
      // Example:
      <Item
        title="Dashboard"
        to="/dashboard"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />,
      <Item
        title="Reports"
        to="/team"
        icon={<FormatListBulletedOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />,
      // Add more engineer menu items here...
    ],
    warehouse: [
      // Add menu items for warehouse manager role
      // Define menu items for warehouse manager role
      // Example:
      <Item
        title="Dashboard"
        to="/dashboard"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />,
      // Add more warehouse manager menu items here...
    ],
  };

  // Determine the menu items based on the user's role
  const userMenuItems = menuItems[role] || [];

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        {!collapsed && (
          <Box mb="25px">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                "& .avater-image": {
                  backgroundColor: colors.primary[500],
                },
              }}
            >
              <img
                className="avater-image"
                alt="profile user"
                width="100px"
                height="100px"
                src={"../../assets/MAP.jpeg"}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                MAPatrawala
              </Typography>
            </Box>
          </Box>
        )}
        <Menu iconshape="square">
          {userMenuItems.map((menuItem, index) => (
            <React.Fragment key={index}>{menuItem}</React.Fragment>
          ))}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
