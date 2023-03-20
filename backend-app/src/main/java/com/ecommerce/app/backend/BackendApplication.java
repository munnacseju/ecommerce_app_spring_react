package com.ecommerce.app.backend;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ecommerce.app.backend.models.Authority;
import com.ecommerce.app.backend.models.User;
import com.ecommerce.app.backend.repositories.UserDetailsRepository;

@SpringBootApplication
public class BackendApplication {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserDetailsRepository userDetailsRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	// @PostConstruct
	// protected void init() {
	//
	// List<Authority> authorityList=new ArrayList<>();
	//
	// authorityList.add(createAuthority("USER","User role"));
	// //authorityList.add(createAuthority("ADMIN","Admin role"));
	//
	// User user=new User();
	//
	// user.setUserName("motiur4");
	// user.setFirstName("Motiur Rahman");
	// user.setLastName("Munna");
	//
	// user.setPassword(passwordEncoder.encode("motiur12"));
	// user.setAuthorities(authorityList);
	// userDetailsRepository.save(user);
	// }
	//
	//
	// private Authority createAuthority(String roleCode,String roleDescription) {
	// Authority authority=new Authority();
	// authority.setRoleCode(roleCode);
	// authority.setRoleDescription(roleDescription);
	// return authority;
	// }

}
