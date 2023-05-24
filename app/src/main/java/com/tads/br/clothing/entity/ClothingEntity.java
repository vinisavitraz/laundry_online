package com.tads.br.clothing.entity;

public class ClothingEntity {
    private Long id;
    private String name;
    private Double washPrice;
    private Integer washTime;

    public ClothingEntity(Long id, String name, Double washPrice, Integer washTime) {
        this.id = id;
        this.name = name;
        this.washPrice = washPrice;
        this.washTime = washTime;
    }

    public ClothingEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
