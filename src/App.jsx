import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Trade from "./pages/Trade";
import Market from "./pages/Market";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Deposit from "./pages/Deposit";
import DepositDetails from "./pages/DepositDetails";
import DepositSubmission from "./pages/DepositSubmission";
import UsersPage from "./admin/pages/Users";

import AdminLayout from "./admin/AdminLayout";
import AdminOverview from "./admin/pages/admin-overview";
import Deposits from "./admin/pages/Deposits";
import Withdrawals from "./admin/pages/Withdrawals";
import Trades from "./admin/pages/Trades";
import Bonuses from "./admin/pages/Bonuses";
import EmailManagement from "./admin/pages/EmailManagement";
import SettingsPage from "./admin/pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/market" element={<Market />} />
          <Route path="/history" element={<History />} />

          {/* Deposit Routes */}
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/deposit/details" element={<DepositDetails />} />
          <Route path="/deposit/submit" element={<DepositSubmission />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Admin Dashboard */}
       <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminOverview />} />
  <Route path="users" element={<UsersPage />} />
  <Route path="deposits" element={<Deposits />} /> 
  <Route path="withdrawals" element={<Withdrawals />} />
  <Route path="trades" element={<Trades />} />
  <Route path="bonuses" element={<Bonuses />} />
  <Route path="emails" element={<EmailManagement />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>

        {/* Default Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;