package com.tads.br.user.dto.request;

import com.tads.br.user.entity.UserEntity;

public class RegisterUserRequestDto {

    private UserEntity entity;

    public RegisterUserRequestDto(UserEntity entity) {
        this.entity = entity;
    }

    public RegisterUserRequestDto() {
    }

    public UserEntity getEntity() {
        return entity;
    }

    public void setEntity(UserEntity entity) {
        this.entity = entity;
    }
}
