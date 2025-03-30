// lib/auth.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // Normally you would make an API call here
    // For demo purposes, we'll use a sample admin
    if (email === "admin@example.com" && password === "password123") {
      const userData = {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      };
      
      setUser(userData);
      localStorage.setItem("admin_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);