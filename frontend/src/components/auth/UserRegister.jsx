import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserRegister = () => {

  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // Handle form submission logic here
  const response = await axios.post("/api/users/register", {
      fullName: firstName + " " + lastName,
      email,
      password
  },{ withCredentials: true})
  }

  navigate("/");



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
            <div className="auth-logo">🍽️</div>
            <span className="auth-badge">User</span>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us and start ordering delicious meals</p>
          </div>

          <form className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  placeholder="John"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="john.doe@example.com"
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
              <span className="form-helper">Must be at least 8 characters</span>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="checkbox-input"
                required
              />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account
            </button>
          </form>

          <div className="auth-divider">or</div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Want to list your restaurant?{' '}
              <Link to="/food-partner/register" className="auth-link">
                Register as Food Partner
              </Link>
            </p>
            <p className="auth-footer-text" style={{ marginTop: 'var(--spacing-sm)' }}>
              Already have an account?{' '}
              <Link to="/user/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
