package com.ecommerce.app.backend.controllers;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.app.backend.constant.EcommerceConstant;
import com.ecommerce.app.backend.models.Buyer;
import com.ecommerce.app.backend.models.User;
import com.ecommerce.app.backend.models.UserRole;
import com.ecommerce.app.backend.services.SellerService;
import com.ecommerce.app.backend.services.UserService;

@RestController
@RequestMapping("/api")
public class BuyerController {
    public static final String ADD_SELLER = "/addSeller";
    public static final String FIND_ALL_SELLER = "/findAllSeller";
    public static final String DELETE_SELLER = "/deleteSeller/{id}";
    public static final String FIND_SELLER = "/findSeller/{id}";

    @Autowired
    private UserService userService;

    @Autowired
    private SellerService sellerService;

    // @RequestMapping(value = ADD_SELLER, method = RequestMethod.POST)
    // @ResponseBody
    // public HashMap<String, Object> addSeller(@RequestBody Buyer buyer) {
    // HashMap<String, Object> response = new HashMap<>();
    // String email =
    // SecurityContextHolder.getContext().getAuthentication().getName();
    // Optional<User> userOptional = userService.findByEmail(email);
    // User user = userOptional.get();
    // if(!user.getUserRole().equalsIgnoreCase(UserRole.ADMIN.toString())){
    // System.out.println(user.getUserRole() + " " + UserRole.ADMIN.toString());
    // response.put("status", EcommerceConstant.STATUS.NOT_OK);
    // response.put("message", "You can't change seller");
    // response.put("seller", buyer);
    // return response;
    // }
    // buyer.setUser(user);
    // sellerService.save(buyer);
    // response.put("status", EcommerceConstant.STATUS.OK);
    // response.put("message", "Added Successfully");
    // response.put("seller", buyer);
    // return response;
    // }
    //
    // @RequestMapping(value = FIND_ALL_SELLER, method = RequestMethod.GET)
    // @ResponseBody
    // public HashMap<String, Object> findBabiesByUser() {
    // HashMap<String, Object> response = new HashMap<>();
    // // String email =
    // SecurityContextHolder.getContext().getAuthentication().getName();
    // // Optional<User> userOptional = userService.findByEmail(email);
    // // User user = userOptional.get();
    // response.put("status", EcommerceConstant.STATUS.OK);
    // response.put("sellers", sellerService.findAll());
    // // sellerService.findByUser(user);
    // return response;
    // }
    //
    // @RequestMapping(value = DELETE_SELLER, method = RequestMethod.POST)
    // @ResponseBody
    // public HashMap<String, Object> deleteSeller(@PathVariable Long id) {
    // HashMap<String, Object> response = new HashMap<>();
    // String email =
    // SecurityContextHolder.getContext().getAuthentication().getName();
    // Optional<User> userOptional = userService.findByEmail(email);
    // User user = userOptional.get();
    // if(!user.getUserRole().equalsIgnoreCase(UserRole.ADMIN.toString())){
    // response.put("status", EcommerceConstant.STATUS.NOT_OK);
    // response.put("message", "You can't change seller");
    // return response;
    // }
    // sellerService.deleteById(id);
    // response.put("status", EcommerceConstant.STATUS.OK);
    // response.put("message", "order deleted!");
    // return response;
    // }
    //
    // @RequestMapping(value = FIND_SELLER, method = RequestMethod.GET)
    // @ResponseBody
    // public HashMap<String, Object> findSeller(@PathVariable Long id) {
    // HashMap<String, Object> response = new HashMap<>();
    // String email =
    // SecurityContextHolder.getContext().getAuthentication().getName();
    // Optional<User> userOptional = userService.findByEmail(email);
    // User user = userOptional.get();
    // // if(!user.getUserRole().equalsIgnoreCase(UserRole.ADMIN.toString())){
    // // response.put("status", SellerConstant.STATUS.NOT_OK);
    // // response.put("message", "You can't change seller");
    // // return response;
    // // }
    // Optional<Buyer> sellerOptional = sellerService.findById(id);
    // if(sellerOptional.isEmpty()){
    // response.put("status", EcommerceConstant.STATUS.NOT_OK);
    // response.put("message", "Invalid seller id");
    // return response;
    // }
    // response.put("status", EcommerceConstant.STATUS.OK);
    // response.put("message", "order found");
    // response.put("seller", sellerOptional.get());
    // return response;
    // }
}
