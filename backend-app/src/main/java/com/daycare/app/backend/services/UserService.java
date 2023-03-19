package com.daycare.app.backend.services;

import java.util.Optional;

import com.daycare.app.backend.models.User;

public interface UserService {
    void save(User user);

    Optional<User> findById(Long id);
    Iterable<User> findAll();

    Optional<User> findByUserName(String userName);
}
