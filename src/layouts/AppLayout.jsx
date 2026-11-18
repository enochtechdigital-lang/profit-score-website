import { Outlet } from "react-router-dom";

import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";

function AppLayout() {
  return (
    <div className="app-container">

      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <BottomNav />

    </div>
  );
}

export default AppLayout;