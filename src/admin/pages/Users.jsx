import { useState } from "react";
import {
  Search,
  Users,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Real user records will be loaded from the backend later.
  const users = [];

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-users-page">

      <div className="admin-page-heading">
        <div>
          <h2>User Management</h2>
          <p>View and manage registered Profit Score accounts.</p>
        </div>
      </div>

      {/* User Statistics */}
      <div className="admin-stat-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span>Total Users</span>
            <Users size={22} />
          </div>
          <h3>—</h3>
          <p>Registered accounts</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span>Active Users</span>
            <ShieldCheck size={22} />
          </div>
          <h3>—</h3>
          <p>Active accounts</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span>Marketing Subscribers</span>
            <Mail size={22} />
          </div>
          <h3>—</h3>
          <p>Users who opted in</p>
        </div>

      </div>

      {/* Search */}
      <div className="admin-users-toolbar">
        <div className="admin-users-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <span className="admin-users-count">
          {filteredUsers.length} users
        </span>
      </div>

      {/* Users Table */}
      <div className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email Address</th>
              <th>Registration Date</th>
              <th>Account Status</th>
              <th>Marketing Consent</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.registrationDate}</td>
                  <td>{user.status}</td>
                  <td>
                    {user.marketingConsent ? "Subscribed" : "Not subscribed"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <div className="admin-users-empty">
                    <UserRound size={35} />
                    <h3>No user records yet</h3>
                    <p>
                      Registered accounts will appear here when
                      the backend is connected.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default UsersPage;