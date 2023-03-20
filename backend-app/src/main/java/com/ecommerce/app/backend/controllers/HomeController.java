package com.ecommerce.app.backend.controllers;

import java.util.HashMap;

import javax.validation.constraints.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.backend.models.User;
import com.ecommerce.app.backend.models.UserRole;
import com.ecommerce.app.backend.services.EmailService;
import com.ecommerce.app.backend.services.UserService;

@RestController
public class HomeController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public HashMap<String, String> home() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
        HashMap<String, String> values = new HashMap<>();
        values.put("hello", "Welcome!");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authUserEmail = (authentication.getName());
        User user = userService.findByUserName(authUserEmail).get();
        values.put("user name", user.getFirstName());
        values.put("User Email", authUserEmail);
        return values;
    }

    @GetMapping("/api/test")
    public HashMap<String, String> test() {
        HashMap<String, String> values = new HashMap<>();
        values.put("hello", "Welcome!");
        System.out.println("Role: " + UserRole.ADMIN);
        return values;
    }
}
