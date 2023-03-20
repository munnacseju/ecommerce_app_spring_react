package com.ecommerce.app.backend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ecommerce.app.backend.models.Product;
import com.ecommerce.app.backend.models.User;

public interface ProductRepository extends CrudRepository<Product, Long> {
    Optional<Product> findById(Long id);

    Iterable<Product> findByUser(User user);
}
