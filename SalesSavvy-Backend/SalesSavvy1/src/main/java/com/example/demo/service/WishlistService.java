package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Wishlist;
import com.example.demo.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public List<Wishlist> getWishlistByUserId(int userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public String addToWishlist(int userId, int productId) {
        if (wishlistRepository.findByUserIdAndProductId(userId, productId).isPresent()) {
            return "Product is already in the wishlist!";
        }
        Wishlist wishlist = new Wishlist();
        wishlist.setUserId(userId);
        wishlist.setProductId(productId);
        wishlistRepository.save(wishlist);
        return "Product added to wishlist successfully!";
    }

    public String removeFromWishlist(int userId, int productId) {
        Optional<Wishlist> wishlist = wishlistRepository.findByUserIdAndProductId(userId, productId);
        if (wishlist.isPresent()) {
            wishlistRepository.delete(wishlist.get());
            return "Product removed from wishlist!";
        }
        return "Product not found in the wishlist!";
    }
}
