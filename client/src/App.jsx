import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navabar";
import Searchpage from "./pages/Searchpage"; 
import Homepage from "./pages/Homepage"; 
import { FavoriteProvider } from "./contexts/FavoriteContext";

function App() {
  return (
    <>
    <FavoriteProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Searchpage />} /> 
      </Routes>
      </FavoriteProvider>
    </>
  );
}

export default App;
