package com.daycare.app.backend.services;

import java.util.Optional;

import com.daycare.app.backend.models.Product;
import com.daycare.app.backend.models.User;

public interface ProductService {
	void save(Product Product);
	Optional<Product> findById(Long id);
    Iterable<Product> findByUser(User user);
	void deleteById(Long id);
}
