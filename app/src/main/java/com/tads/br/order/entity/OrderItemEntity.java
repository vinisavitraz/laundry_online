package com.tads.br.order.entity;

public class OrderItemEntity {
    private Long id;
    private Integer totalQuantity;
    private Double totalWashPrice;
    private Long clothingId;

    public OrderItemEntity(Long id, Integer totalQuantity, Double totalWashPrice, Long clothingId) {
        this.id = id;
        this.totalQuantity = totalQuantity;
        this.totalWashPrice = totalWashPrice;
        this.clothingId = clothingId;
    }

    public OrderItemEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Double getTotalWashPrice() {
        return totalWashPrice;
    }

    public void setTotalWashPrice(Double totalWashPrice) {
        this.totalWashPrice = totalWashPrice;
    }

    public Long getClothingId() {
        return clothingId;
    }

    public void setClothingId(Long clothingId) {
        this.clothingId = clothingId;
    }
}
