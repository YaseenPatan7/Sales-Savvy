import React from 'react';
import { CartIcon } from './CartIcon';
import { ProfileDropdown } from './ProfileDropdown';
import './assets/styles.css';
import Logo from './Logo';
import { Link } from 'react-router-dom';

export function Header({ cartCount, wishlistCount, username }) {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo Section */}
        <Logo />
        
        {/* Header Actions */}
        <div className="header-actions">
          {/* Wishlist Button with count */}
          <Link to="/wishlist" className="wishlist-button">
            Wishlist ({wishlistCount})
          </Link>

          {/* Cart Icon */}
          <CartIcon count={cartCount} />

          {/* Profile Dropdown */}
          <ProfileDropdown username={username} />
        </div>
      </div>
    </header>
  );
}
