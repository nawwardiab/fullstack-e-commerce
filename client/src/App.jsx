import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Contexts
import { FavoriteProvider } from "./context/FavoriteContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Components
import Navbar from "./components/Navabar";

// Pages
import Homepage from "./pages/Homepage";
import Searchpage from "./pages/Searchpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductPage from './pages/Productpage';
import CartPage from "./pages/Cartpage"; 

const App = () => {
  return (
    <AuthProvider>
      <CartProvider> 
        <FavoriteProvider>
   
            <Navbar /> 
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/search" element={<Searchpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
   
        </FavoriteProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
