
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Both email and password are required.');
      return;
    }

    try {
      const response = await axios.post('/api/login', { email, password });
      // Expecting { token, user } in the response data
      const { token, user } = response.data;
      loginUser(user, token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('An error occurred during login.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to register</h2>
        {errorMsg && (
          <div className="mb-4 text-red-500 text-center">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email.."
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password.."
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </form>
        <p className="mt-4 text-center">
          If you don't have an account.Please register{' '}
          <Link to="/signup" className="text-blue-500">
           here
          </Link>
        </p>
        When you create an account, you agree to our <Link>Terms of use</Link>. <br /> Learn how we handle your data in our <Link>Privacy notice</Link>.
        <form action="">
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Continue with Google"
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Continue with Apple"
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Continue with Facebook"
              className="mt-1 w-full p-2 border rounded"
            />
          </div>


        </form>
      </div>
    </div>
  );
};

export default Login;

