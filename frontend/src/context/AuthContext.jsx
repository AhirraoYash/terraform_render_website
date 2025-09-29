import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Create the context object. This will be our global "state container".
const AuthContext = createContext(null);

// 2. Create the AuthProvider component. This component will wrap our entire application.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This effect runs once when the app starts. It checks if we have a user
  // saved in the browser's localStorage from a previous session for persistence.
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('mern_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('mern_user');
    }
    setLoading(false); // Finished loading the initial user state.
  }, []);

  // --- API Functions ---

  const login = async (email, password) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const res = await fetch(`${apiUrl}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }
    setUser(data.user);
    localStorage.setItem('mern_user', JSON.stringify(data.user));
  };

  const signup = async (name, email, password) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const res = await fetch(`${apiUrl}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Signup failed');
    }
    setUser(data.user);
    localStorage.setItem('mern_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mern_user');
  };

  // 3. Provide the user state and functions to all child components.
  const value = { user, login, signup, logout };

  // Don't render the app until we've checked for a saved user.
  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. Create a custom hook for easy access to the context.
// Any component can now call `useAuth()` to get the user and login/logout functions.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

