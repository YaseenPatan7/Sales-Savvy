import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import CustomerHomePage from "./CustomerHomePage";
import CartPage from "./CartPage";
import OrderPage from "./OrdersPage";
import AdminLogin from "./AdminLogin"; 
import AdminDashboard from "./AdminDashboard";
import Wishlist from "./Wishlist";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/customerhome" element={<CustomerHomePage />} />
      <Route path="/UserCartPage" element={<CartPage />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;