import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (localStorage.getItem('token')) {
    return <>{children}</>;
  } else {
    localStorage.clear();
    return <Navigate to="/signup/login" replace />;
  }
}
