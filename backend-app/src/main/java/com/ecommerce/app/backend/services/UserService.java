package com.ecommerce.app.backend.services;

import java.util.Optional;

import com.ecommerce.app.backend.models.User;

public interface UserService {
    void save(User user);

    Optional<User> findById(Long id);

    Iterable<User> findAll();

    Optional<User> findByUserName(String userName);
}
