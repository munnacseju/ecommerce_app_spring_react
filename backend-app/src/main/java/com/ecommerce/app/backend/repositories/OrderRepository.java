package com.ecommerce.app.backend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ecommerce.app.backend.models.Order;
import com.ecommerce.app.backend.models.User;

public interface OrderRepository extends CrudRepository<Order, Long> {
    Optional<Order> findById(Long id);

    Iterable<Order> findByUser(User user);
}
