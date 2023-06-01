package com.tads.br.user.dto.request;

import com.tads.br.user.entity.UserEntity;

public class CreateEmployeeRequestDto {

    private UserEntity entity;

    public CreateEmployeeRequestDto(UserEntity entity) {
        this.entity = entity;
    }

    public CreateEmployeeRequestDto() {
    }

    public UserEntity getEntity() {
        return entity;
    }

    public void setEntity(UserEntity entity) {
        this.entity = entity;
    }
}
