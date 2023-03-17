package com.daycare.app.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daycare.app.backend.models.Product;
import com.daycare.app.backend.models.User;
import com.daycare.app.backend.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository ProductRepository;
	
	@Override
	public void save(Product Product) {
		ProductRepository.save(Product); 
	}

	@Override
	public Optional<Product> findById(Long id) {
		return ProductRepository.findById(id);
	}
	@Override
	public Iterable<Product> findByUser(User user) {
		return ProductRepository.findByUser(user);
	}
	@Override
	public void deleteById(Long id) {
		ProductRepository.deleteById(id);
	}
}
