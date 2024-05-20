import React,{useState} from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route,useLocation } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard/dashboard";
import Team from "./pages/team/team";
import InvoicesReturnables from "./pages/invoicesreturnables/invoice-Returnables";
import InvoicesNonReturnables from './pages/invoiceNonReturnables/invoiceNonreturnables'
import Form from "./pages/form/form";
import Calendar from "./pages/calendar/calendar";

import Item from './pages/item/item';

import Quotation from './pages/quotation/quotation';

import PurchaseOrder from './pages/salesOrderNRform/salesorderNonReturnable';
import Report from './pages/reports/report';
import SignIn from './pages/signin/signin';
import SignOut from './pages/signOut/signup'

import BoqList from './pages/boqList/boqList';
import SaleOrderNRlist from './pages/saleorderNRList/saleorderNRlist';
import SaleOrderReturnablesForm from './pages/salesorderReturnablesForm/salesordere-Returnables-Form';
import SalesOrderListForm from './pages/salesorderNRlistform/salesorderNRlistform';
import DeliveryChallanReturnables from './pages/deliverychallanReturnables/deliverychallanReturnables';
import SaleOrderReturnlist from './pages/salesOrderReturnableList/salesOrderReturnList';
import PendingReturnables from './pages/pendingReturnables/PendingReturnable';
import PendingNonReturnables from './pages/pendingNonReturnables/PendingNonReturnables';
import DeliveryChallanNonReturnales from './pages/deliveryChallanNonReturnables/deliveryChallanNonReturnales'

// import Sodcpnds from './pages/sodcpnds/sodcpnds';

import SaleNonReturnablesDocs from './pages/document/SaleNonReturnableDoc';
import MailService from './pages/mailFormat/mailService';

import PurchaseRequestForm from './pages/purchaseRequestForm/PurchaseRequestForm';
import PurchaseRequestList from './pages/purchaseRequestList/purchaseRequestList';

import AdminPurchaseRequestList from './pages/AdminPurchaseRequestList/AdminPurchaseRequestList';

const App = () => {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [document,setDocument]=useState(false);
  const [docData,setDocData]=useState([]);
  // Check if the user is authenticated based on the current route
  const checkAuthentication = () => {
    const publicRoutes = ['/', '/signup']; // Define public routes
    const isPublicRoute = publicRoutes.includes(location.pathname);
    setAuthenticated(!isPublicRoute); // If the route is public, user is not authenticated
  };

  // Call checkAuthentication whenever the route changes
  React.useEffect(() => {
    checkAuthentication();
  }, [location.pathname]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {authenticated && !document && (
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/InvoicesReturnables" element={<InvoicesReturnables />} />
                <Route path='/InvoicesNonReturnables'element={<InvoicesNonReturnables />}/>
                <Route path="/form" element={<Form />} />
                <Route path="/item" element={<Item />} />
               
                <Route path="/calendar" element={<Calendar />} />
                
                <Route path="/quotation" element={<Quotation />} />
               
                <Route path="/salesorderNonReturnable" element={<PurchaseOrder />} />
                <Route path="/report" element={<Report />} />
                <Route path="/signin" element={<SignIn />} />
                
                <Route path='/DeliveryChallanNonReturnales' element={<DeliveryChallanNonReturnales   document={document} setDocument={setDocument}/>} />
                
                <Route path="/BoqList" element={<BoqList document={document} />} />
                <Route path='/SaleOrderNRlist' element={<SaleOrderNRlist setDocData={setDocData}  />} />
                <Route path="/SaleOrderReturnablesForm" element={<SaleOrderReturnablesForm/>} />
                <Route path="/saleOrderReturnList" element={<SaleOrderReturnlist />}/>
                <Route path="/DeliveryChallanReturnables" element={<DeliveryChallanReturnables/>}/>
                <Route path='/salesorderlistform' element={<SalesOrderListForm  />}/>
                <Route path='/pendingReturnables' element={<PendingReturnables/>}/>
                <Route path='/pendingNonReturnables' element={<PendingNonReturnables/>}/>
                {/* <Route path="/sodcpnds" element={<Sodcpnds />} /> */}
                <Route path='/mailService' element={<MailService/>}/>
                {/* <Route path='/materialPurchase' element={<MaterialPurchase/>}/> */}
                <Route path='/purchaseRequestForm' element={<PurchaseRequestForm />} />
                <Route path='/purchaseRequestList' element={<PurchaseRequestList/>}/>
                <Route path='/adminPurchaseRequestList' element={<AdminPurchaseRequestList/>}/>
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      )}
           <Routes>
          <Route path="/" element={<SignIn />} />
          {/* <Route path='/document' element={<Document document={document} setDocument={setDocument} docData={docData} />} /> */}
          {/* <Route path='/signout' element={<SignIn />} /> */}
          <Route path="/SaleNonReturnablesDocs" element={<SaleNonReturnablesDocs />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
