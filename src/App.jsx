import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login/Login'
import Users from './Components/User/Users'


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const tokenValidity = localStorage.getItem('tokenValidity');
  
  if (!token || (tokenValidity && parseInt(tokenValidity) < Date.now())) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App