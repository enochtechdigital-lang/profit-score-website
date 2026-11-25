import { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Wallet,
  ArrowLeftRight,
  Coins,
  Save,
} from "lucide-react";

function SettingsPage() {
  const [platformName, setPlatformName] = useState("Profit Score");
  const [tradingFee, setTradingFee] = useState("1");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [depositsEnabled, setDepositsEnabled] = useState(true);
  const [withdrawalsEnabled, setWithdrawalsEnabled] = useState(true);

  function handleSave() {
    alert("Settings interface only. Backend saving is not connected yet.");
  }

  return (
    <div className="admin-deposits-page">
      <div className="admin-page-heading">
        <div>
          <h1>Platform Settings</h1>
          <p>Manage your Profit Score platform configuration.</p>
        </div>
      </div>

      <div className="admin-settings-card">
        <div className="email-section-heading">
          <Settings size={20} />
          <h2>General Settings</h2>
        </div>

        <div className="email-form-group">
          <label>Platform Name</label>
          <input
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-settings-card">
        <div className="email-section-heading">
          <Wallet size={20} />
          <h2>Wallet Settings</h2>
        </div>

        <div className="admin-setting-row">
          <div>
            <h3>Deposits</h3>
            <p>Allow users to submit deposit requests.</p>
          </div>

          <input
            type="checkbox"
            checked={depositsEnabled}
            onChange={(e) => setDepositsEnabled(e.target.checked)}
          />
        </div>

        <div className="admin-setting-row">
          <div>
            <h3>Withdrawals</h3>
            <p>Allow users to submit withdrawal requests.</p>
          </div>

          <input
            type="checkbox"
            checked={withdrawalsEnabled}
            onChange={(e) => setWithdrawalsEnabled(e.target.checked)}
          />
        </div>
      </div>

      <div className="admin-settings-card">
        <div className="email-section-heading">
          <ArrowLeftRight size={20} />
          <h2>Trading Settings</h2>
        </div>

        <div className="email-form-group">
          <label>Trading Fee (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={tradingFee}
            onChange={(e) => setTradingFee(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-settings-card">
        <div className="email-section-heading">
          <ShieldCheck size={20} />
          <h2>Security & Maintenance</h2>
        </div>

        <div className="admin-setting-row">
          <div>
            <h3>Maintenance Mode</h3>
            <p>Restrict normal platform access during maintenance.</p>
          </div>

          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
          />
        </div>
      </div>

      <button className="email-send-button" onClick={handleSave}>
        <Save size={17} />
        Save Settings
      </button>
    </div>
  );
}

export default SettingsPage;