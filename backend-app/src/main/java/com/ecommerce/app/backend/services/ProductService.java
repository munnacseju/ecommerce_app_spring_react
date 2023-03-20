package com.ecommerce.app.backend.services;

import java.util.Optional;

import com.ecommerce.app.backend.models.Product;
import com.ecommerce.app.backend.models.User;

public interface ProductService {
	void save(Product Product);

	Optional<Product> findById(Long id);

	Iterable<Product> findByUser(User user);

	public Iterable<Product> findAll();

	void deleteById(Long id);
}
