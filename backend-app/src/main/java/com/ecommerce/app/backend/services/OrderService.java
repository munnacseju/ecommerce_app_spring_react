package com.ecommerce.app.backend.services;

import java.util.Optional;

import com.ecommerce.app.backend.models.Order;
import com.ecommerce.app.backend.models.User;

public interface OrderService {
	void save(Order service);

	Optional<Order> findById(Long id);

	Iterable<Order> findByUser(User user);

	Iterable<Order> findAll();

	void deleteById(Long id);
}