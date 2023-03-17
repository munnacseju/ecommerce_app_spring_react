package com.daycare.app.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "buyer")
public class Buyer {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buyer_id")
    private Long id;
	
	@ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

	private String adminFeedBack;
	
	private String address;
	
    @Column(columnDefinition = "TEXT")
	private String imageBase64;


	public Buyer(){}


	public Buyer(Long id, User user, String adminFeedBack, String address, String imageBase64) {
		super();
		this.id = id;
		this.user = user;
		this.adminFeedBack = adminFeedBack;
		this.address = address;
		this.imageBase64 = imageBase64;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public String getAdminFeedBack() {
		return adminFeedBack;
	}


	public void setAdminFeedBack(String adminFeedBack) {
		this.adminFeedBack = adminFeedBack;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getImageBase64() {
		return imageBase64;
	}


	public void setImageBase64(String imageBase64) {
		this.imageBase64 = imageBase64;
	}
	
	
	
}
