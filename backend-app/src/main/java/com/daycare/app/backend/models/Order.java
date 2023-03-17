package com.daycare.app.backend.models;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ecommerce_order")
public class Order {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;
	
	@ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
	
	@Column(name = "Product_id", nullable = false)
    private Long ProductId;
	
    @Column(name = "seller_id")
    private Long sellerId;
	
	
	private String status;
	
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdTime = new Timestamp(System.currentTimeMillis());
	
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp updatedTime = new Timestamp(System.currentTimeMillis());
	
	private boolean isPaymentDone = false;	
	
	private boolean isDelivered = false;
	
	private Long orderedPrice;
	
	
	
	public Order() {
	}



	public Order(Long id, User user, Long productId, Long sellerId, String status, Timestamp createdTime,
			Timestamp updatedTime, boolean isPaymentDone, boolean isDelivered, Long orderedPrice) {
		super();
		this.id = id;
		this.user = user;
		ProductId = productId;
		this.sellerId = sellerId;
		this.status = status;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
		this.isPaymentDone = isPaymentDone;
		this.isDelivered = isDelivered;
		this.orderedPrice = orderedPrice;
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



	public Long getProductId() {
		return ProductId;
	}



	public void setProductId(Long productId) {
		ProductId = productId;
	}



	public Long getSellerId() {
		return sellerId;
	}



	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public Timestamp getCreatedTime() {
		return createdTime;
	}



	public void setCreatedTime(Timestamp createdTime) {
		this.createdTime = createdTime;
	}



	public Timestamp getUpdatedTime() {
		return updatedTime;
	}



	public void setUpdatedTime(Timestamp updatedTime) {
		this.updatedTime = updatedTime;
	}



	public boolean isPaymentDone() {
		return isPaymentDone;
	}



	public void setPaymentDone(boolean isPaymentDone) {
		this.isPaymentDone = isPaymentDone;
	}



	public boolean isDelivered() {
		return isDelivered;
	}



	public void setDelivered(boolean isDelivered) {
		this.isDelivered = isDelivered;
	}


	public Long getOrderedPrice() {
		return orderedPrice;
	}



	public void setOrderedPrice(Long orderedPrice) {
		this.orderedPrice = orderedPrice;
	}	

}
