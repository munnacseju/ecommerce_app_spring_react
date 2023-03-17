package com.daycare.app.backend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.daycare.app.backend.models.Buyer;
public interface SellerRepository extends CrudRepository<Buyer, Long>{
    Optional<Buyer> findById(Long id);
    Iterable<Buyer> findAll();
}

