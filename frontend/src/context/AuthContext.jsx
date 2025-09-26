import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // We remove the token state because our simple backend doesn't use it yet
  // const [token, setToken] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    // We remove the token logic from here as well
    // const savedToken = localStorage.getItem('auth_token');
    if (savedUser) setUser(JSON.parse(savedUser));
    // if (savedToken) setToken(savedToken);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const res = await fetch(`${apiUrl}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    
    setUser(data.user);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
    // We remove the token logic from here
    // setToken(data.token);
    // localStorage.setItem('auth_token', data.token);
  };

  const signup = async (name, email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');
    
    setUser(data.user);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
    // We remove the token logic from here
    // setToken(data.token);
    // localStorage.setItem('auth_token', data.token);
  };

  const logout = () => {
    setUser(null);
    // setToken(null);
    localStorage.removeItem('auth_user');
    // localStorage.removeItem('auth_token');
  };
  
  // This function is for authenticated requests, which we can leave for now
  const authFetch = async (input, init = {}) => {
    return fetch(input, { ...init });
  };

  // We remove 'token' from the value passed to the context
  const value = { user, login, signup, logout, authFetch };
  if (loading) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
