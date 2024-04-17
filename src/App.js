import React from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard/dashboard";
import Team from "./pages/team/team";
import Invoices from "./pages/invoices/invoice";
import Form from "./pages/form/form";
import Calendar from "./pages/calendar/calendar";
import Pocform from './pages/pocform/pocform';
import Item from './pages/item/item';
import Banking from './pages/banking/banking';
import Quotation from './pages/quotation/quotation';
import Paymentrecevied from './pages/paymentrecevied/paymentrecevied'; 
import PurchaseOrder from './pages/salesOrderform/salesorderNonReturnable';
import Report from './pages/reports/report';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import Contacts from './pages/contacts/contact';
import BOQ from './pages/boq/boq';
import SaleOrderlist from './pages/saleorderlist/saleorderlist';
import SaleOrder from './pages/saleorder/saleorder';
import SalesOrderListForm from './pages/salesorderlistform/salesorderlistform';
import DeliveryChallan from './pages/deliverychallan/deliverychallan';

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/item" element={<Item />} />
                <Route path="/banking" element={<Banking />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/pocform" element={<Pocform />} />
                <Route path="/quotation" element={<Quotation />} />
                <Route path="/paymentrecevied" element={<Paymentrecevied />} />
                <Route path="/salesorderNonReturnable" element={<PurchaseOrder />} />
                <Route path="/report" element={<Report />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/contact" element={<Contacts />} />
                <Route path="/boq" element={<BOQ />} />
                <Route path='/saleorderlist' element={<SaleOrderlist />} />
                <Route path="/saleorder" element={<SaleOrder/>} />
                <Route path="/deliverychallan" element={<DeliveryChallan/>}/>
                <Route path='/salesorderlistform' element={<SalesOrderListForm/>}/>
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
