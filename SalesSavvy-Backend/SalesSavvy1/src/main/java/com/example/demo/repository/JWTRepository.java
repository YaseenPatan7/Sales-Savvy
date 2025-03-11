package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.JWTToken;

import jakarta.transaction.Transactional;

public interface JWTRepository extends JpaRepository<JWTToken, Integer> {

	Optional<JWTToken> findByToken(String token);
	
	// Custom query to find tokens by user ID
	@Query("SELECT t FROM JWTToken t WHERE t.user.userId = :userId")
	JWTToken findByUserId(@Param("userId") int userId);
	
	// Custom query to delete the tokens by user ID
	@Modifying
	@Transactional
	@Query("DELETE FROM JWTToken t WHERE t.user.userId = :userId")
	void deleteByUserId(@Param("userId") int userId);

}
