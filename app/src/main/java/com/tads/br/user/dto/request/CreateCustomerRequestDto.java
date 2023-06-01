package com.tads.br.user.dto.request;

import com.tads.br.user.entity.UserEntity;

public class CreateCustomerRequestDto {

    private UserEntity entity;

    public CreateCustomerRequestDto(UserEntity entity) {
        this.entity = entity;
    }

    public CreateCustomerRequestDto() {
    }

    public UserEntity getEntity() {
        return entity;
    }

    public void setEntity(UserEntity entity) {
        this.entity = entity;
    }
}
