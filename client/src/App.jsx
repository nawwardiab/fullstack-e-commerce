import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navabar";
import Searchpage from "./pages/Searchpage"; 
import Homepage from "./pages/Homepage"; 
import { FavoriteProvider } from "./contexts/FavoriteContext";
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from "./pages/Homepage"
import { AuthProvider, AuthContext } from './context/AuthContext';


const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};


const App = () => {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<Searchpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Redirect any unknown routes to /login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </FavoriteProvider>
    </AuthProvider>
  );
};

export default App;
