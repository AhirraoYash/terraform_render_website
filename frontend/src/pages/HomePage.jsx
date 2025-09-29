import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user } = useAuth();

  const containerStyle = {
    textAlign: 'center',
    padding: '50px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '2rem auto',
  };

  return (
    <div style={containerStyle}>
      {user ? (
        // If the user is logged in, show a welcome message
        <>
          <h1>Login Successful!</h1>
          <p style={{ fontSize: '1.2rem' }}>
            Welcome back, <strong>{user.name}</strong>!
          </p>
          <p>You have successfully logged into the application.</p>
        </>
      ) : (
        // If no user is logged in, show a generic welcome message
        <>
          <h1>Welcome to the MERN Starter App</h1>
          <p>This is a basic application built to demonstrate DevOps principles.</p>
          <p>
            Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to continue.
          </p>
        </>
      )}
    </div>
  );
} 