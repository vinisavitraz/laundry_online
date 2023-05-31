package com.tads.br.order.service;

import com.tads.br.order.entity.OrderEntity;

import java.util.List;

public interface OrderServiceInterface {

    OrderEntity findOrderById(Long id);

    List<OrderEntity> getOrdersByUserAndStatus(long userId, String status);

}
