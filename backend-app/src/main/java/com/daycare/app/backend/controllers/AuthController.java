package com.daycare.app.backend.controllers;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.daycare.app.backend.config.JWTTokenHelper;
import com.daycare.app.backend.constant.EcommerceConstant;
import com.daycare.app.backend.controllers.request.AuthenticationRequest;
import com.daycare.app.backend.models.Authority;
import com.daycare.app.backend.models.User;
import com.daycare.app.backend.models.UserRole;
import com.daycare.app.backend.responses.LoginResponse;
import com.daycare.app.backend.responses.UserInfo;
import com.daycare.app.backend.services.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class AuthController {
	public static final String REGISTER = "/register";
	public static final String LOGGED_USER_DETAILS = "/me";
	public static final String VERIFY_PIN = "/verifypin/{pin}";

	@Autowired
	private UserService userService;

//	@Autowired
//	private EmailService emailService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	JWTTokenHelper jWTTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@RequestMapping(value = REGISTER, method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> registerUser(@RequestBody User user) {
		HashMap<String, Object> response = new HashMap<>();
		Optional<User> existsUser = userService.findByUserName(user.getUsername());
		if (existsUser.isPresent()) {
			response.put("status", EcommerceConstant.STATUS.NOT_OK);
			response.put("error", "User is already registered!");
			return response;
		}
		user.setPassword(passwordEncoder().encode(user.getPassword()));

		Random r = new Random();
		int result = r.nextInt(99999 - 10000) + 10000;
		
		String verificationPin = String.valueOf(result);
		List<Authority> authorityList = new ArrayList<>();
		authorityList.add(createAuthority("USER", "User role"));
//		authorityList.add(createAuthority("ADMIN", "Admin role"));
		user.setAuthorities(authorityList);
		userService.save(user);
		response.put("status", EcommerceConstant.STATUS.OK);
		response.put("message", "Successfully registered!");
		// emailService.sendSimpleMessage(user.getEmail(), "Ecommerce account
		// verification code", "Hello, Your Daycare account varification code is
		// "+verificationPin);
		System.out.println("Mail send " + user.getUsername());
		return response;
	}

	@RequestMapping(value = LOGGED_USER_DETAILS, method = RequestMethod.GET)
	@ResponseBody
	public HashMap<String, Object> loggedUserDetails() {
		HashMap<String, Object> response = new HashMap<>();
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		Optional<User> userOptional = userService.findByUserName(email);
		User user = userOptional.get();
		response.put("status", EcommerceConstant.STATUS.OK);
		response.put("data", user);
		return response;
	}
//    
//    @RequestMapping(value = VERIFY_PIN, method = RequestMethod.GET)
//    @ResponseBody
//    public HashMap<String, Object> verificationPin(@PathVariable String pin) {
//        HashMap<String, Object> response = new HashMap<>();
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        Optional<User> userOptional = userService.findByEmail(email);
//        User user = userOptional.get();
//        if(pin.equals(user.getVerificationPin())) {
//        	user.setIsVerified(true);
//            userService.save(user);
//            response.put("status", EcommerceConstant.STATUS.OK);
//            System.out.println("user virification updated");
//        }else {
//        	response.put("status", EcommerceConstant.STATUS.NOT_OK);
//            System.out.println("code not equal" + "pin " + pin);
//            return response;
//        }
//
//        response.put("user", user);
//        return response;
//    }

	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest)
			throws InvalidKeySpecException, NoSuchAlgorithmException {

		System.out.println("Getting a request");
		final Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(),
						authenticationRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		User user = (User) authentication.getPrincipal();
		String jwtToken = jWTTokenHelper.generateToken(user.getUsername());

		LoginResponse response = new LoginResponse();
		response.setToken(jwtToken);

		System.out.println("User Name" + user.getUserName());

		return ResponseEntity.ok(response);
	}

	@GetMapping("/auth/userinfo")
	public ResponseEntity<?> getUserInfo(Principal user) {
		User userObj = (User) userDetailsService.loadUserByUsername(user.getName());

		UserInfo userInfo = new UserInfo();
		userInfo.setFirstName(userObj.getFirstName());
		userInfo.setLastName(userObj.getLastName());
		userInfo.setRoles(userObj.getAuthorities().toArray());
		return ResponseEntity.ok(userInfo);
	}

	private Authority createAuthority(String roleCode, String roleDescription) {
		Authority authority = new Authority();
		authority.setRoleCode(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}
}
