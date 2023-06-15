package com.tads.br.order.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderEntity {
    private Long id;
    private String status;
    private Double washPrice;
    private Integer washTime;
    private Date createDate;
    private Date paymentDate;
    private Long customerId;
    private List<OrderItemEntity> items;

    public OrderEntity(Long id, String status, Double washPrice, Integer washTime, Date createDate, Date paymentDate, Long customerId, List<OrderItemEntity> items) {
        this.id = id;
        this.status = status;
        this.washPrice = washPrice;
        this.washTime = washTime;
        this.createDate = createDate;
        this.paymentDate = paymentDate;
        this.customerId = customerId;
        this.items = items;
    }

    public OrderEntity() {
        this.items = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getWashPrice() {
        return washPrice;
    }

    public void setWashPrice(Double washPrice) {
        this.washPrice = washPrice;
    }

    public Integer getWashTime() {
        return washTime;
    }

    public void setWashTime(Integer washTime) {
        this.washTime = washTime;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public List<OrderItemEntity> getItems() {
        return items;
    }

    public void setItems(List<OrderItemEntity> items) {
        this.items = items;
    }
}
