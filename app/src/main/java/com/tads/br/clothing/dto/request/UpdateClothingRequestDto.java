package com.tads.br.clothing.dto.request;

import com.tads.br.clothing.entity.ClothingEntity;

public class UpdateClothingRequestDto {

    private ClothingEntity entity;

    public UpdateClothingRequestDto(ClothingEntity entity) {
        this.entity = entity;
    }

    public UpdateClothingRequestDto() {
    }

    public ClothingEntity getEntity() {
        return entity;
    }

    public void setEntity(ClothingEntity entity) {
        this.entity = entity;
    }
}
