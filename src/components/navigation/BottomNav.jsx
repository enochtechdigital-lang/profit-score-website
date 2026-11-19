import { NavLink } from "react-router-dom";

import {
  Home,
  Wallet,
  ArrowLeftRight,
  ChartNoAxesCombined,
  History
} from "lucide-react";

function BottomNav() {
  return (
    <nav className="bottom-nav">

      <NavLink to="/home" className="nav-item">
        <Home size={21} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/wallet" className="nav-item">
        <Wallet size={21} />
        <span>Wallet</span>
      </NavLink>

      <NavLink to="/trade" className="nav-item">
        <ArrowLeftRight size={21} />
        <span>Trade</span>
      </NavLink>

      <NavLink to="/market" className="nav-item">
        <ChartNoAxesCombined size={21} />
        <span>Market</span>
      </NavLink>

      <NavLink to="/history" className="nav-item">
        <History size={21} />
        <span>History</span>
      </NavLink>

    </nav>
  );
}

export default BottomNav;