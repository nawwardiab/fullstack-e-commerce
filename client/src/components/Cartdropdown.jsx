import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const CartDropdown = ({ isVisible }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getTotalSavings } = useCart();

  return (
    <div
      className={`absolute right-0 mt-1 w-80 bg-white shadow-lg rounded-lg p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">Your Bag</h3>

      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between mb-3 border-b pb-3">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                  <div className="ml-3">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-red-500 font-semibold">€{item.price}</p>
                    <p className="text-sm text-gray-500 line-through">€{item.originalPrice}</p>
                    <p className="text-xs text-green-600">
                      You save: €{(parseFloat(item.originalPrice) - parseFloat(item.price)).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                  >
                    <FaMinus className="w-4 h-4 text-gray-600" />
                  </button>

                  <span className="text-md font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                  >
                    <FaPlus className="w-4 h-4 text-gray-600" />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 bg-red-500 rounded-full hover:bg-red-600 transition"
                  >
                    <FaTrash className="w-4 h-4 text-white" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Summary */}
          <div className="mt-4 text-right">
            <p className="text-md font-semibold">Total: €{getCartTotal()}</p>
            <p className="text-sm text-green-600 font-semibold">Total Savings: €{getTotalSavings()}</p>
          </div>

          {/* Checkout Button */}
          <Link
            to="/cart"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 mt-3 rounded-md"
          >
            Go to bag
          </Link>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartDropdown;
