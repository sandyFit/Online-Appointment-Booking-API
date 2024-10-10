import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Optionally, verify token validity here (e.g., decode or make an API call to verify)
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
