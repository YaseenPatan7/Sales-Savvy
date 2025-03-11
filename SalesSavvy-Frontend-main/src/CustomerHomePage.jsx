import React, { useState, useEffect } from 'react';
import { CategoryNavigation } from './CategoryNavigation';
import { ProductList } from './ProductList';
import { Footer } from './Footer';
import { Header } from './Header';
import './assets/styles.css';

export default function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0); // State for wishlist count
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false); // State for cart fetch error
  const [isCartLoading, setIsCartLoading] = useState(true); // State for cart loading
  const [isWishlistLoading, setIsWishlistLoading] = useState(true); // State for wishlist loading

  useEffect(() => {
    fetchProducts();
    if (username) {
      fetchCartCount(); // Fetch cart count only if username is available
      fetchWishlistCount(); // Fetch wishlist count if username is available
    }
  }, [username]); // Re-run cart count and wishlist fetch if username changes

  const fetchProducts = async (category = '') => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/products${category ? `?category=${category}` : '?category=Shirts'}`, 
        { credentials: 'include' } // Include authToken as a cookie
      );
      const data = await response.json();
      if (data) {
        setUsername(data.user?.name || 'Guest'); // Extract username
        setProducts(data.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true); // Set loading state
    try {
      const response = await fetch(`http://localhost:9090/api/cart/items/count?username=${username}`, {
        credentials: 'include', // Include authToken as a cookie
      });
      const count = await response.json();
      setCartCount(count);
      setCartError(false); // Reset error state if successful
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true); // Set error state
    } finally {
      setIsCartLoading(false); // Remove loading state
    }
  };

  // New function to fetch wishlist count
  const fetchWishlistCount = async () => {
    setIsWishlistLoading(true); // Set loading state
    try {
      const response = await fetch(`http://localhost:9090/api/wishlist/items/count?username=${username}`, {
        credentials: 'include', // Include authToken as a cookie
      });
      const count = await response.json();
      setWishlistCount(count);
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
    } finally {
      setIsWishlistLoading(false); // Remove loading state
    }
  };

  // Function to add a product to the wishlist
  const handleAddToWishlist = async (productId) => {
    if (!username) {
      console.error('Username is required to add items to the wishlist');
      return;
    }
    try {
      const response = await fetch('http://localhost:9090/api/wishlist/add', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, productId }), // Include username and productId in the request
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchWishlistCount(); // Update wishlist count
      } else {
        console.error('Failed to add product to wishlist');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

  const handleAddToCart = async (productId) => {
    if (!username) {
      console.error('Username is required to add items to the cart');
      return;
    }
    try {
      const response = await fetch('http://localhost:9090/api/cart/add', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, productId }), // Include username and productId in the request
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchCartCount(); // Update cart count
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        wishlistCount={isWishlistLoading ? '...' : wishlistCount} // Pass wishlist count to Header
        username={username}
      />
      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </nav>
      <main className="main-content">
        <ProductList 
          products={products} 
          onAddToCart={handleAddToCart} 
          onAddToWishlist={handleAddToWishlist} // Pass handleAddToWishlist to ProductList
        />
      </main>
      <Footer />
    </div>
  );
}
