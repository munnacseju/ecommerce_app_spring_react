package com.ecommerce.app.backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.ecommerce.app.backend.models.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUserName(String userName);
}
