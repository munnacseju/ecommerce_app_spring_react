package com.ecommerce.app.backend.services;

import java.util.Optional;

import com.ecommerce.app.backend.models.Review;
import com.ecommerce.app.backend.models.User;

public interface ReviewService {
	void save(Review review);

	Optional<Review> findById(Long id);

	Iterable<Review> findByUser(User user);

	Iterable<Review> findBySellerId(Long sellerId);

	void deleteById(Long id);
}
