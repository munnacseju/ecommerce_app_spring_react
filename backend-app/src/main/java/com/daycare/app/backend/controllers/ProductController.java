package com.daycare.app.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import com.daycare.app.backend.constant.EcommerceConstant;
import com.daycare.app.backend.models.Authority;
import com.daycare.app.backend.models.Product;
import com.daycare.app.backend.models.User;
import com.daycare.app.backend.services.ProductService;
import com.daycare.app.backend.services.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {
    public static final String ADD_Product = "/addProduct";
    public static final String FIND_Product_BY_ID = "/findProduct/{id}";
    public static final String FIND_ALL_Product_BY_USER = "/findAllProduct";
    public static final String DELETE_Product = "/deleteProduct/{id}";

    @Autowired
    private UserService userService;
    
    @Autowired
    private ProductService ProductService;
    
    @RequestMapping(value = ADD_Product, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addProduct(@RequestBody Product product) {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        
        User user = userOptional.get();
//        user.getAuthorities().stream()
//        .filter(authority -> authority.getAuthority().equals("ADMIN"))
//        .forEach(authority -> System.out.println("ADMIN"));


        System.out.println("Okay....");
        
        List<Authority> authorities = (List<Authority>) user.getAuthorities();
        if (authorities.stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            product.setUser(user);
            ProductService.save(product);
            response.put("product", product);
            response.put("status", EcommerceConstant.STATUS.OK);
            response.put("message", "Successfully added product");
            return response;
        } else {
            response.put("status", EcommerceConstant.STATUS.NOT_OK);
            response.put("message", "Successfully added product");
            return response;
        }
    }

    @RequestMapping(value = FIND_ALL_Product_BY_USER, method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> findBabiesByUser() {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        response.put("products", ProductService.findByUser(user));
        response.put("status", EcommerceConstant.STATUS.OK);
        // ProductService.findByUser(user);
        return response;
    }

    @RequestMapping(value = DELETE_Product, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> deleteProduct(@PathVariable Long id) {
        HashMap<String, Object> response = new HashMap<>();
        ProductService.deleteById(id);
        response.put("status", EcommerceConstant.STATUS.OK);
        response.put("message", "Successfully Product deleted");
        return response;
    }
}
