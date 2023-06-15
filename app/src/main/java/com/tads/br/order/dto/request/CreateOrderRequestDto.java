package com.tads.br.order.dto.request;

import com.tads.br.order.entity.OrderEntity;
import com.tads.br.order.entity.OrderItemEntity;

import java.util.ArrayList;
import java.util.List;

public class CreateOrderRequestDto {

    private OrderEntity entity;
    private List<OrderItemEntity> items;

    public CreateOrderRequestDto(OrderEntity entity, List<OrderItemEntity> items) {
        this.entity = entity;
        this.items = items;
    }

    public CreateOrderRequestDto() {
        this.items = new ArrayList<>();
    }

    public OrderEntity getEntity() {
        return entity;
    }

    public void setEntity(OrderEntity entity) {
        this.entity = entity;
    }

    public List<OrderItemEntity> getItems() {
        return items;
    }

    public void setItems(List<OrderItemEntity> items) {
        this.items = items;
    }
}
