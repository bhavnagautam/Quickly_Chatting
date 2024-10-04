import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Signin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/signup',  // Replace with your actual API endpoint
        {
          name,
          email,
          number,
          password,
          companyId
        },
        {
            headers: {
              'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE',
              'type': 'superAdmin'
            }
          }
      );

      console.log('Signup successful:', response.data);
      const { token, email: responseEmail, userId }=response.data.items;
      localStorage.setItem("token",token);
      localStorage.setItem("email",responseEmail);
      localStorage.setItem("useId",userId);
      // Handle successful signup (e.g., redirect or show success message)
    } catch (err) {
      setError('Signup failed. Please check your details.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder='Enter Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="number">
              Mobile Number
            </label>
            <input
              type="tel"
              id="number"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder='Enter Mobile Number'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="companyId">
              Company ID
            </label>
            <input
              type="text"
              id="companyId"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder='Enter Company Id'
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <div  className='text-center pt-4 text-gray-500'><Link to="/" className='text-lg underline pt-4'>LogIn</Link></div>
      </div>
    </div>
  );
};

export default Signin;
