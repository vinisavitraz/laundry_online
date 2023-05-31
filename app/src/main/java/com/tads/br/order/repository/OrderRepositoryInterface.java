package com.tads.br.order.repository;

import com.tads.br.order.entity.OrderEntity;

import java.util.List;

public interface OrderRepositoryInterface {

    Long create(OrderEntity order);

    OrderEntity findById(Long id);

    List<OrderEntity> findOrdersByStatus(String status);

    List<OrderEntity> findOpenOrdersByCustomerAndStatus(Long id, String status);
}
