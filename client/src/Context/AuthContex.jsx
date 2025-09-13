import React, { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Provider component
export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(() => {
    // Restore token from localStorage on refresh
    return localStorage.getItem("token") || null;
  });
  const [user, setUser] = useState(null);

  // Token verification logic
  const verifyToken = useCallback(async () => {
    if (token) {
      try {
        const res = await axios.get(`/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(res.data.msg);
        setUser(res.data.user);
        setIsLogin(true);
      } catch (err) {
        toast.error(err?.response?.data?.msg || "Session expired");
        setUser(null);
        setIsLogin(false);
        setToken(null);
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  // Run on mount & token change
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, token, setToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
