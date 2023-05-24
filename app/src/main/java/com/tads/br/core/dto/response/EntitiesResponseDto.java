package com.tads.br.core.dto.response;

import java.util.List;

public class EntitiesResponseDto<T> {
    private List<T> entities;

    public EntitiesResponseDto(List<T> entities) {
        this.entities = entities;
    }

    public List<T> getEntities() {
        return entities;
    }

    public void setEntities(List<T> entities) {
        this.entities = entities;
    }
}
