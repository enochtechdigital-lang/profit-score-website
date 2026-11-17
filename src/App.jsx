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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/market" element={<Market />} />
          <Route path="/history" element={<History />} />

          {/* Deposit Routes */}
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/deposit/details" element={<DepositDetails />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;