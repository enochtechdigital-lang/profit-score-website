import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-card">

        <img
          src="/images/profit-score-logo.png"
          alt="Profit Score"
          className="auth-logo"
        />

        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Join Profit Score and get started.
        </p>

        <form>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            required
          />

          <label>Password</label>

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              required
              minLength={8}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <label>Confirm Password</label>

          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              required
              minLength={8}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          <label className="remember-me terms-checkbox">
            <input type="checkbox" required />
            I agree to the Terms and Conditions.
          </label>

          <button type="submit" className="auth-submit">
            <UserPlus size={18} />
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;