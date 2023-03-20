package com.ecommerce.app.backend.controllers;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import org.apache.http.HttpStatus;
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
import com.ecommerce.app.backend.models.Product;
import com.ecommerce.app.backend.models.User;
import com.ecommerce.app.backend.services.ProductService;
import com.ecommerce.app.backend.services.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {
    public static final String ADD_PRODUCT = "/addProduct";
    public static final String FIND_PRODUCT_BY_ID = "/findProduct/{id}";
    public static final String FIND_ALL_Product_BY_USER = "/findAllProduct";
    public static final String FIND_ALL_PRODUCTS = "/findAllProducts";
    public static final String UPDATE_PRODUCT = "/updateProduct";
    public static final String DELETE_PRODUCT = "/deleteProduct/{id}";

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @RequestMapping(value = ADD_PRODUCT, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addProduct(@RequestBody Product product) {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);

        User user = userOptional.get();
        List<Authority> authorities = (List<Authority>) user.getAuthorities();
        if (authorities.stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            product.setUser(user);
            productService.save(product);
            response.put("product", product);
            response.put("status", EcommerceConstant.STATUS.OK);
            response.put("message", "Successfully added product");
            return response;
        } else {
            response.put("status", EcommerceConstant.STATUS.NOT_OK);
            response.put("message", "Permission Denied!");
            return response;
        }
    }

    @RequestMapping(value = UPDATE_PRODUCT, method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> updateProduct(@RequestBody Product product) {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        List<Authority> authorities = (List<Authority>) user.getAuthorities();
        if (authorities.stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            productService.save(product);
            response.put("product", product);
            response.put("status", EcommerceConstant.STATUS.OK);
            response.put("message", "Successfully added product");
            return response;
        } else {
            response.put("status", EcommerceConstant.STATUS.NOT_OK);
            response.put("message", "Permission Denied!");
            return response;
        }
    }

    @RequestMapping(value = FIND_ALL_PRODUCTS, method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> findProducts() {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        Iterable<Product> products = productService.findAll();

        Iterable<Product> productsIterable = productService.findAll();
        List<Product> productsList = StreamSupport.stream(productsIterable.spliterator(), false)
                .collect(Collectors.toList());
        Collections.sort(productsList, Comparator.comparingDouble(Product::getPrice));

        response.put("products", productsList);
        response.put("status", EcommerceConstant.STATUS.OK);
        // ProductService.findByUser(user);
        return response;
    }

    @RequestMapping(value = FIND_ALL_Product_BY_USER, method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> findProductByUser() {
        HashMap<String, Object> response = new HashMap<>();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        response.put("products", productService.findByUser(user));
        response.put("status", EcommerceConstant.STATUS.OK);
        // ProductService.findByUser(user);
        return response;
    }

    @RequestMapping(value = DELETE_PRODUCT, method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Object> deleteProduct(@PathVariable Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userService.findByUserName(email);
        User user = userOptional.get();
        HashMap<String, Object> response = new HashMap<>();
        List<Authority> authorities = (List<Authority>) user.getAuthorities();
        if (authorities.stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            productService.deleteById(id);
            response.put("status", EcommerceConstant.STATUS.OK);
            response.put("message", "Successfully Product deleted");
        } else {
            response.put("status", EcommerceConstant.STATUS.NOT_OK);
            response.put("message", "Permission Denied!");
        }
        return response;
    }
}
