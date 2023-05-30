package com.tads.br.order.controller;

import com.tads.br.core.dto.response.EntityResponseDto;
import com.tads.br.order.entity.OrderEntity;
import com.tads.br.order.service.OrderServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

public class OrderController {

    private final OrderServiceInterface service;

    public OrderController(OrderServiceInterface service) {
        this.service = service;
    }

    @GetMapping("/orders/{id}")
    @ResponseBody
    public EntityResponseDto<OrderEntity> getOrderById(@PathVariable("id") long id) {
        OrderEntity order = this.service.findOrderById(id);

        return new EntityResponseDto<>(order);
    }
}
