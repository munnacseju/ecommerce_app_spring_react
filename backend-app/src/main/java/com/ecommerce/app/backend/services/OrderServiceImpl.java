package com.ecommerce.app.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.app.backend.models.Order;
import com.ecommerce.app.backend.models.User;
import com.ecommerce.app.backend.repositories.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Override
	public void save(Order order) {
		orderRepository.save(order);

	}

	@Override
	public Optional<Order> findById(Long id) {
		return orderRepository.findById(id);
	}

	@Override
	public Iterable<Order> findByUser(User user) {
		return orderRepository.findByUser(user);
	}

	@Override
	public void deleteById(Long id) {
		orderRepository.deleteById(id);

	}

	@Override
	public Iterable<Order> findAll() {
		return orderRepository.findAll();
	}

}
