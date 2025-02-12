import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { MdShoppingBag } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { useCart } from "../context/CartContext"; 
import CartDropdown from "./Cartdropdown"; 

function Navbar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { cartItems, getCartCount } = useCart(); 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        navigate(`/search?query=${query}`);
      }
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md relative">
      {/* Logo */}
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        DressMe
      </div>

      {/* Navigation Links */}
      <ul className="flex justify-center flex-grow space-x-8 ml-55">
        {["men", "women", "kids"].map((category) => (
          <li
            key={category}
            className="cursor-pointer"
            onClick={() => navigate(`/search?category=${category}`)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="relative w-44">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg pl-10 p-2 w-full"
            onKeyDown={handleSearch}
          />
          <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        {/* Wishlist Icon */}
        <CiHeart className="text-gray-600 w-8 h-8 cursor-pointer" />

        {/* Shopping Bag Icon + Cart Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <div className="relative">
            <MdShoppingBag className="text-gray-600 w-8 h-8 cursor-pointer" />
            {/* Show cart count if items exist */}
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {getCartCount()}
              </span>
            )}
          </div>

          {isDropdownVisible && <CartDropdown cartItems={cartItems} isVisible={isDropdownVisible} />}
        </div>

        {/* Account Icon */}
        <VscAccount className="text-gray-600 w-8 h-8 cursor-pointer" onClick={() => navigate("/login")} />
      </div>
    </nav>
  );
}

export default Navbar;
