import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-card">

        <img
          src="/images/profit-score-logo.png"
          alt="Profit Score"
          className="auth-logo"
        />

        <h2>Welcome Back</h2>
        <p className="auth-subtitle">
          Sign in to continue to your account.
        </p>

        <form>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>

            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="auth-submit">
            <LockKeyhole size={18} />
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;