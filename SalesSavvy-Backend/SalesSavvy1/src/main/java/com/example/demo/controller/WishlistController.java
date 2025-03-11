package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Wishlist;
import com.example.demo.service.WishlistService;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Wishlist>> getWishlist(@PathVariable int userId) {
        return ResponseEntity.ok(wishlistService.getWishlistByUserId(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToWishlist(@RequestParam int userId, @RequestParam int productId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(userId, productId));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFromWishlist(@RequestParam int userId, @RequestParam int productId) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(userId, productId));
    }
}
