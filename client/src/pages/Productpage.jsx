import React, { useEffect, useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

function ProductPage() {
  const { id } = useParams();
  const { addToCart, isInCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);


  const getDiscountedPrice = (price) => (price * 0.7).toFixed(2); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const discountedPrice = getDiscountedPrice(product.price);

    const productToAdd = {
      ...product,
      size: selectedSize,
      price: discountedPrice,
      originalPrice: product.price,
    };

    addToCart(productToAdd);

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) return <p className="text-center">Loading product details...</p>;
  if (!product) return <p className="text-center">Product not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/2 flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[500px] object-contain object-top rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1 md:ml-6 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold">{product.category}</h2>
          <h3 className="text-xl text-gray-800 mt-2">{product.title}</h3>

          {/* Price Section with Discount */}
          <div className="mt-2">
            <p className="text-lg font-semibold text-red-500">
              Sale Price: €{getDiscountedPrice(product.price)}
            </p>
            <p className="text-md text-gray-500 line-through">
              Original: €{product.price}
            </p>
            <p className="text-sm text-green-600">30% OFF - Limited Time</p>
          </div>

          <div className="mt-8">
            <label className="font-semibold" htmlFor="size">
              Choose your size:
            </label>
            <select
              id="size"
              className="mt-2 border border-gray-300 rounded-lg p-2 w-full"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className="mt-10">
            <button
              className={`w-full text-white py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 transition-all duration-300 ${
                addedToCart || isInCart(product.id)
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
              onClick={handleAddToCart}
              disabled={addedToCart || isInCart(product.id)}
            >
              <MdShoppingBag className="w-6 h-6" />
              <span className="font-medium">
                {addedToCart || isInCart(product.id)
                  ? "Added to Bag"
                  : "Add to Bag"}
              </span>
            </button>
          </div>

          <div className="mt-10 p-4 bg-gray-100 rounded-lg flex flex-col items-center text-gray-700 shadow-md">
            <div className="flex items-center space-x-3">
              <FaTruck className="text-gray-500 w-6 h-6" />
              <p className="text-md font-medium">Fast Delivery in 1-2 Days</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Standard delivery available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
