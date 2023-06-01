package com.tads.br.user.dto.request;

import com.tads.br.user.entity.UserEntity;

public class UpdateEmployeeRequestDto {

    private UserEntity entity;

    public UpdateEmployeeRequestDto(UserEntity entity) {
        this.entity = entity;
    }

    public UpdateEmployeeRequestDto() {
    }

    public UserEntity getEntity() {
        return entity;
    }

    public void setEntity(UserEntity entity) {
        this.entity = entity;
    }
}
