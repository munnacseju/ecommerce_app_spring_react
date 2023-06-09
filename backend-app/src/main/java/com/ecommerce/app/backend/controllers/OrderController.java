package com.ecommerce.app.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.backend.constant.EcommerceConstant;
import com.ecommerce.app.backend.models.Authority;
import com.ecommerce.app.backend.models.Order;
import com.ecommerce.app.backend.models.User;
import com.ecommerce.app.backend.services.OrderService;
import com.ecommerce.app.backend.services.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class OrderController {
    public static final String ADD_ORDER = "/addOrder";
    public static final String UPDATE_ORDER = "/updateOrder";
    public static final String FIND_ORDER_BY_ID = "/findOrder/{id}";
    public static final String FIND_ALL_ORDER_BY_USER = "/findAllOrder";
    public static final String DELETE_ORDER = "/deleteOrder/{id}";

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = ADD_ORDER, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addOrder(@RequestBody Order order) {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        order.setUser(user);
        order.setStatus(EcommerceConstant.ORDER_STATUS.PENDING.toString());
        order.setDelivered(false);
        orderService.save(order);
        response.put("order", order);
        response.put("status", EcommerceConstant.STATUS.OK);
        return response;
    }

    @RequestMapping(value = UPDATE_ORDER, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> updateOrder(@RequestBody Order order) {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        if (order.getId() == null) {
            response.put("status", EcommerceConstant.STATUS.NOT_OK);
            response.put("message", "Order id empty");
            return response;
        }
        orderService.save(order);
        response.put("status", EcommerceConstant.STATUS.OK);
        response.put("message", "Successfully updated order");
        return response;
    }

    @RequestMapping(value = FIND_ALL_ORDER_BY_USER, method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> findOrdersByUser() {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        response.put("status", EcommerceConstant.STATUS.OK);
        List<Authority> authorities = (List<Authority>) user.getAuthorities();
        if (authorities.stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            response.put("orders", orderService.findAll());
        } else {
            response.put("orders", orderService.findByUser(user));
        }
        // orderService.findByUser(user);
        return response;
    }

    @RequestMapping(value = DELETE_ORDER, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> deleteOrder(@PathVariable Long id) {
        HashMap<String, Object> response = new HashMap<>();
        orderService.deleteById(id);
        response.put("order deleted", id);
        return response;
    }
}
