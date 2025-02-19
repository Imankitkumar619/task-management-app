import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  password: string; // Store password only for demo purposes (avoid in real apps)
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Register user (store in localStorage)
  const register = (email: string, password: string) => {
    const userData: User = { email, password, name: "", token: "" };
    localStorage.setItem("registeredUser", JSON.stringify(userData));
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("User registered:", userData);
  };

  // Login function (checks stored user)
  const login = (email: string, password: string): boolean => {
    const storedUser = localStorage.getItem("registeredUser");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        setUser(parsedUser);
        localStorage.setItem("user", JSON.stringify(parsedUser));
        return true; // Login successful
      }
    }
    return false; // Login failed
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
