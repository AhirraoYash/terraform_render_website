import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Basic inline styles to make the header look clean without CSS files.
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    margin: '0 10px',
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: 0,
  };

  return (
    <header style={navStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontWeight: 'bold' }}>
          MERN App
        </Link>
      </div>
      <nav>
        {user ? (
          // If the user is logged in, show their email and a logout button
          <>
            <span style={{ marginRight: '15px' }}>Hello, {user.name}</span>
            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : (
          // If the user is not logged in, show Login and Signup links
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/signup" style={linkStyle}>
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
