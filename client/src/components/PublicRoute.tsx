import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  if (localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  } else {
    return <>{children}</>;
  }
}
