package com.ecommerce.app.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.app.backend.models.Review;
import com.ecommerce.app.backend.models.User;
import com.ecommerce.app.backend.repositories.ReviewRepository;

import net.bytebuddy.asm.Advice.Return;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public void save(Review review) {
        reviewRepository.save(review);

    }

    @Override
    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    @Override
    public Iterable<Review> findByUser(User user) {
        return reviewRepository.findByUser(user);
    }

    @Override
    public void deleteById(Long id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public Iterable<Review> findBySellerId(Long sellerId) {
        return reviewRepository.findBySellerId(sellerId);
    }

}
