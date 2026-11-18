import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="auth-page">
      <div className="auth-card">

        <img
          src="/images/profit-score-logo.png"
          alt="Profit Score"
          className="auth-logo"
        />

        <h2>Forgot Password?</h2>

        <p className="auth-subtitle">
          Enter your registered email address to reset your password.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="auth-submit">
            <Mail size={18} />
            Send Reset Link
          </button>
        </form>

        <p className="auth-footer">
          Remember your password? <Link to="/login">Sign In</Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;