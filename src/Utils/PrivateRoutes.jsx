// Libraries
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  const jwt = localStorage.getItem('blogjwt');

  return jwt ? <Outlet /> : <Navigate to='/login' />;
}
