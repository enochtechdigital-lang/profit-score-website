import { Search, Bell, UserRound } from "lucide-react";

function Header() {
  return (
    <header className="app-header">

      <div className="brand">
        <img
          src="/images/profit-score-logo.png"
          alt="Profit Score"
          className="brand-logo"
        />
      </div>

      <div className="header-actions">
        <button aria-label="Search">
          <Search size={20} />
        </button>

        <button aria-label="Notifications">
          <Bell size={20} />
        </button>

        <button aria-label="Profile">
          <UserRound size={20} />
        </button>
      </div>

    </header>
  );
}

export default Header;