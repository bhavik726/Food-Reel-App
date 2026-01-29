import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

const FoodPartnerRegister = () => {
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
            <h1 className="auth-title">Partner With Us</h1>
            <p className="auth-subtitle">Register your restaurant and reach more customers</p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label htmlFor="businessName" className="form-label">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                className="form-input"
                placeholder="The Food Haven"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactName" className="form-label">
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                className="form-input"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="contact@business.com"
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

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-input"
                placeholder="123 Main Street, City, State, ZIP"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Register as Partner
            </button>
          </form>

          <div className="auth-divider">or</div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Just ordering food?{' '}
              <Link to="/user/register" className="auth-link">
                Register as User
              </Link>
            </p>
            <p className="auth-footer-text" style={{ marginTop: 'var(--spacing-sm)' }}>
              Already have an account?{' '}
              <Link to="/food-partner/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodPartnerRegister;
