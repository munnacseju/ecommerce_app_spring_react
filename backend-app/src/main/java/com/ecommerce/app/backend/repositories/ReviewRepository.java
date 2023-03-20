package com.ecommerce.app.backend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ecommerce.app.backend.models.Review;
import com.ecommerce.app.backend.models.User;

public interface ReviewRepository extends CrudRepository<Review, Long> {
    Optional<Review> findById(Long id);

    Iterable<Review> findByUser(User user);

    Iterable<Review> findBySellerId(Long sellerId);
}
