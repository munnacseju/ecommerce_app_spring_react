package com.daycare.app.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daycare.app.backend.models.Buyer;
import com.daycare.app.backend.repositories.SellerRepository;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public void save(Buyer review) {
        sellerRepository.save(review);
    }

    @Override
    public Optional<Buyer> findById(Long id) {
        return sellerRepository.findById(id);
    }

    @Override
    public Iterable<Buyer> findAll() {
        return sellerRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        sellerRepository.deleteById(id);
        
    }
    
}
