import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/authAction';
import useApi from '../CustomHook/useApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(
        process.env.REACT_APP_LOGININ_API_URL,
        { email, password },
        {
          headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE',
            'type': 'superAdmin'
          }
        }
      );
  
      // Extract token, email, and userId from the response
      const { token, email: responseEmail, userId ,Name} = response.data.items; 
  
      // Save token and userId to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('email', responseEmail);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName',Name);// Ensure name is correctly set

      // Dispatch login action with both token and userId
      dispatch(login(token, userId,Name));
  
      // Navigate to chat
      navigate('/chat');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  // const { data, error: apiError,fetchData } = useApi(); // Adjust useApi hook accordingly

  // useEffect(() => {
  //   if (apiError) {
  //     setError('Login failed. Please check your credentials.');
  //   }
  //   if (data) {
  //     const { token, email: responseEmail, userId, name } = data.items;
      
  //     // Save token and userId to localStorage
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('email', responseEmail);
  //     localStorage.setItem('userId', userId);

  //     // Dispatch login action with both token and userId
  //     dispatch(login(token, userId, name));

  //     // Navigate to chat
  //     navigate('/chat');
  //   }
  // }, [data, apiError, dispatch, navigate]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   // Trigger the API request using your useApi hook
  //   fetchData({
  //     url: process.env.REACT_APP_LOGININ_API_URL,
  //     method: 'POST',
  //     body: { email, password },
  //   });
  // };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder='Enter Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div  className='text-center pt-4 text-gray-500'><Link to="signin" className='text-lg underline pt-4'>SignIn</Link></div>
      </div>
    </div>
  );
};

export default Login;
