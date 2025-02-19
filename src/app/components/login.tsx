import React, { useState } from 'react';
import Register from '../components/register';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    console.log('Logging in user...');
    const success = login(credentials.email, credentials.password);
    if (!success) {
      setError('Invalid email or password!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  const handleRegisterSubmit = (email: string, password: string) => {
    console.log('Registering user...');
    register(email, password);
    setIsRegistering(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center max-h-screen">
      {isRegistering ? (
        <Register onSubmit={handleRegisterSubmit} />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Log In
              </button>
              <button type="button" onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded">
                Register
              </button>
            </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default Login;
