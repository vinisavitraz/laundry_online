package com.tads.br.commons.dto.response;

public class EntityResponseDto<T> {
    private T entity;

    public EntityResponseDto(T entity) {
        this.entity = entity;
    }

    public T getEntity() {
        return entity;
    }

    public void setEntity(T entity) {
        this.entity = entity;
    }
}
