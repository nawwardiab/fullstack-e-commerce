import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { MdShoppingBag } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        navigate(`/search?query=${query}`);
      }
    }
  };
  const navigate = useNavigate(); 

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>DressMe</div>
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          margin: 0,
          padding: 0,
          justifyContent: "center",
          flexGrow: 1,
          marginLeft: "10rem",
        }}
      >
        {["men", "women", "kids"].map((category) => (
          <li
            key={category}
            style={{ cursor: "pointer", marginLeft: "5rem" }}
            onClick={() => navigate(`/search?category=${category}`)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="relative w-44" style={{ marginRight: "15px" }}>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg pl-10 p-2 w-full"
            style={{ paddingLeft: "40px" }}
            onKeyDown={handleSearch}
          />
          <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        <CiHeart aria-hidden="true" className="text-gray-600 w-8 h-8" style={{ marginRight: "15px" }} />
        <MdShoppingBag aria-hidden="true" className="text-gray-600 w-8 h-8" style={{ marginRight: "15px" }} />
        <VscAccount aria-hidden="true" className="text-gray-600 w-8 h-8" />

        <CiHeart className="w-7 h-7" style={{ marginRight: "15px" }} />
        <MdShoppingBag className="w-7 h-7" style={{ marginRight: "15px" }} />
        
        {/* Navigate to Login Page when Clicking on VscAccount */}
        <div onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          <VscAccount className="w-7 h-7" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

