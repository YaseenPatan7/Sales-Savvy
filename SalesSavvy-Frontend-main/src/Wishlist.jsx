import React, { useEffect, useState } from "react";
import "./WishlistPage.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Fetch wishlist items on component load
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/wishlist/items", {
          credentials: "include", // Include session cookie
        });
        if (!response.ok) throw new Error("Failed to fetch wishlist items");
        const data = await response.json();

        setWishlistItems(
          data?.wishlist?.products.map((item) => ({
            ...item,
            price: parseFloat(item.price).toFixed(2),
          })) || []
        );
        setUsername(data?.username || ""); // Save the username from the response
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlistItems();
  }, []);

  // Remove item from the wishlist
  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch("http://localhost:9090/api/wishlist/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId }),
      });
      if (response.status === 204) {
        setWishlistItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
      } else throw new Error("Failed to remove item");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Move item to cart
  const handleMoveToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:9090/api/wishlist/move-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId }),
      });
      if (response.status === 200) {
        setWishlistItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
      } else throw new Error("Failed to move item to cart");
    } catch (error) {
      console.error("Error moving item to cart:", error);
    }
  };

  const totalProducts = () => wishlistItems.length;

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page empty">
        <h2>Your Wishlist is Empty</h2>
        <p>Add some items to your wishlist!</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw" }}>
      <Header wishlistCount={totalProducts()} username={username} />
      <div className="wishlist-container">
        <div className="wishlist-page">
          <a href="#" className="back-button">
            ← Continue Shopping
          </a>

          <div className="wishlist-header">
            <h2>Your Wishlist</h2>
            <p>You have {wishlistItems.length} items in your wishlist</p>
          </div>

          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <div key={item.product_id} className="wishlist-item">
                <img
                  src={item.image_url || "https://via.placeholder.com/80?text=No+Image"}
                  alt={item.name}
                />
                <div className="item-details">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="price">₹{item.price}</span>
                  </div>
                  <div className="item-actions">
                    <button
                      className="move-to-cart-btn"
                      onClick={() => handleMoveToCart(item.product_id)}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.product_id)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
