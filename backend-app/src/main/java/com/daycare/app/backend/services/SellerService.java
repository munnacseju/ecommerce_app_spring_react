package com.daycare.app.backend.services;

import java.util.Optional;

import com.daycare.app.backend.models.Buyer;

public interface SellerService {
        void save(Buyer review);
        Optional<Buyer> findById(Long id);
        Iterable<Buyer> findAll();
        void deleteById(Long id);
}
