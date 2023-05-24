package com.tads.br.clothing.dto.request;

import com.tads.br.clothing.entity.ClothingEntity;

public class CreateClothingRequestDto {

    private ClothingEntity entity;

    public CreateClothingRequestDto(ClothingEntity entity) {
        this.entity = entity;
    }

    public CreateClothingRequestDto() {
    }

    public ClothingEntity getEntity() {
        return entity;
    }

    public void setEntity(ClothingEntity entity) {
        this.entity = entity;
    }
}
