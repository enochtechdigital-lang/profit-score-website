import { useState } from "react";
import {
  Mail,
  Users,
  Send,
  Clock,
  Megaphone,
  ShieldCheck,
} from "lucide-react";

function EmailManagement() {
  const [emailType, setEmailType] = useState("marketing");
  const [audience, setAudience] = useState("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="admin-deposits-page">
      <div className="admin-page-heading">
        <div>
          <h1>Email Management</h1>
          <p>Manage email communications with Profit Score users.</p>
        </div>
      </div>

      <div className="admin-deposit-stats">
        <div className="admin-stat-card">
          <Users size={20} />
          <span>Total Recipients</span>
          <h2>—</h2>
        </div>

        <div className="admin-stat-card">
          <Send size={20} />
          <span>Emails Sent</span>
          <h2>—</h2>
        </div>

        <div className="admin-stat-card">
          <Clock size={20} />
          <span>Scheduled Emails</span>
          <h2>—</h2>
        </div>
      </div>

      <div className="admin-deposits-list email-compose-card">
        <div className="email-section-heading">
          <Mail size={20} />
          <h2>Compose Email</h2>
        </div>

        <div className="email-form-group">
          <label>Email Category</label>

          <select
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
          >
            <option value="marketing">Marketing / Promotional</option>
            <option value="transactional">Transactional / Notifications</option>
          </select>
        </div>

        <div className="email-form-group">
          <label>Choose Recipients</label>

          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            <option value="all">All Eligible Users</option>
            <option value="selected">Selected Users</option>
            <option value="group">Specific User Group</option>
          </select>
        </div>

        {emailType === "marketing" && (
          <div className="email-consent-notice">
            <ShieldCheck size={18} />
            <p>
              Promotional emails will only be sent to users
              who have opted in to marketing communications
              and have not unsubscribed.
            </p>
          </div>
        )}

        <div className="email-form-group">
          <label>Email Subject</label>

          <input
            type="text"
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="email-form-group">
          <label>Email Message</label>

          <textarea
            rows="8"
            placeholder="Write your email message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          className="email-send-button"
          onClick={() =>
            alert("Email sending will be connected to the backend later.")
          }
        >
          <Send size={17} />
          Send Email
        </button>
      </div>

      <div className="admin-deposits-list email-history-card">
        <div className="email-section-heading">
          <Megaphone size={20} />
          <h2>Email Campaign History</h2>
        </div>

        <div className="admin-empty-state">
          <Mail size={36} />
          <h3>No email campaigns yet</h3>
          <p>
            Your email campaign history will appear here
            once the email service is connected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailManagement;