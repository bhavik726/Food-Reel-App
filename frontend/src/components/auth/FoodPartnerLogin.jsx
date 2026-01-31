import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("/api/auth/food-partners/login", {
        email,
        password
      }, { withCredentials: true });

      navigate("/create-food");
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🏪</div>
            <span className="auth-badge">Food Partner</span>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to manage your restaurant</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Business Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="contact@restaurant.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="forgot-password">
              <Link to="/food-partner/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="checkbox-input"
              />
              <label htmlFor="remember" className="checkbox-label">
                Remember me
              </label>
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{' '}
              <Link to="/food-partner/register" className="auth-link">
                Become a Partner
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodPartnerLogin;
