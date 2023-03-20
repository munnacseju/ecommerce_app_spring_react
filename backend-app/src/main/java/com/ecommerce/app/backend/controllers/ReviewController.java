package com.ecommerce.app.backend.controllers;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.backend.constant.EcommerceConstant;
import com.ecommerce.app.backend.models.Review;
import com.ecommerce.app.backend.models.User;
import com.ecommerce.app.backend.services.ReviewService;
import com.ecommerce.app.backend.services.UserService;

@RestController
@RequestMapping("/api")
public class ReviewController {
    public static final String ADD_REVIEW = "/addReview";
    public static final String FIND_REVIEW_BY_ID = "/findReview/{id}";
    public static final String FIND_ALL_REVIEW_BY_SELLER = "/findAllReviewSeller/{id}";
    public static final String FIND_ALL_REVIEW_BY_USER = "/findAllReview";
    public static final String DELETE_REVIEW = "/deleteReview/{id}";

    @Autowired
    private UserService userService;

    @Autowired
    private ReviewService reviewService;

    @RequestMapping(value = ADD_REVIEW, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addReview(@RequestBody Review review) {
        HashMap<String, Object> response = new HashMap<>();
        System.out.println("Care giver id: " + review.getSellerId());

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        review.setUser(user);
        reviewService.save(review);
        response.put("status", EcommerceConstant.STATUS.OK);
        response.put("message", "Successfully added review");
        return response;
    }

    @RequestMapping(value = FIND_ALL_REVIEW_BY_USER, method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> findreviewsByUser() {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        response.put("reviews", reviewService.findByUser(user));
        // reviewService.findByUser(user);
        return response;
    }

    @RequestMapping(value = FIND_ALL_REVIEW_BY_SELLER, method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> findreviewsBySellerId(@PathVariable Long id) {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        // User user = userOptional.get();
        response.put("id", id);

        response.put("reviews", reviewService.findBySellerId(id));
        response.put("status", EcommerceConstant.STATUS.OK);
        response.put("message", "Successfully get all reviews");
        return response;
    }

    @RequestMapping(value = DELETE_REVIEW, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> deleteReview(@PathVariable Long id) {
        HashMap<String, Object> response = new HashMap<>();
        reviewService.deleteById(id);
        response.put("status", EcommerceConstant.STATUS.OK);
        response.put("message", "Successfully deleted review");
        return response;
    }
}
