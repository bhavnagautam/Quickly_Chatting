import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/authAction'; // Adjust path to your authAction file

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the logout action
    dispatch(logout());

    // Remove user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    // Redirect to login page after logout
    navigate('/'); 
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Logging out...</h1>
        <p>You will be redirected to the login page.</p>
      </div>
    </div>
  );
};

export default Logout;
