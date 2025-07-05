// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);      // 🆕  flag

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setUserId(u.uid);
        setIsAdmin(u.email === "admin@pasikuthu.com"); // your admin email
      } else {
        setUser(null);
        setUserId(null);
        setIsAdmin(false);
      }
      setLoading(false);                              // ✅ done checking
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userId, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
