"use client"
import React from "react";
import TaskList from "../app/components/TaskList";
import Navbar from "../app/components/Navbar";
import Login from "./components/login";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ width: "100%" }}>
      {isAuthenticated ? (
        <div>
          <div style={{ width: "100%" }}>
            <Navbar />
          </div>
          <div style={{ top: "70%", padding: "20px", marginTop: "20px" }}>
            <TaskList />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Home />
  </AuthProvider>
);

export default App;
