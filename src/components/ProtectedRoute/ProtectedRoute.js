// src/components/ProtectedRoute/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // 환경 변수에서 API 키를 가져와 인증 상태 확인
  const isAuthenticated = !!process.env.REACT_APP_TMDB_API_KEY;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
