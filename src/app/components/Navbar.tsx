"use client"
import React, { useState } from 'react';
import Link from 'next/link';// import Login from './login';
import Login from './login';
import { useAuth } from '@/context/AuthContext';
const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold" style={{ marginLeft: '-213px' }}>Task Manager</div>
        <div className="flex space-x-4" style={{ marginRight: '-213px' }}>
        <div>
          <button onClick={logout} className="text-white">Logout</button>
        </div>
        {showLogin && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded">
              <Login />
              <button className="mt-2 bg-red-500 text-white px-3 py-2 rounded" onClick={() => setShowLogin(false)}>
            Close
              </button>
            </div>
          </div>
        )}
            
        </div>
      </div>
    </nav>
  );
};

export default Navbar;