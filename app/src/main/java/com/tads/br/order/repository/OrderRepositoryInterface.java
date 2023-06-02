package com.tads.br.order.repository;

import com.tads.br.order.entity.OrderEntity;

import java.util.List;

public interface OrderRepositoryInterface {

    OrderEntity create(OrderEntity order);

    OrderEntity findById(Long id);

    List<OrderEntity> findOrdersByStatus(String status);

    List<OrderEntity> findOrdersByCustomer(Long customerId);

    List<OrderEntity> findOpenOrdersByCustomerAndStatus(Long customerId, String status);

    List<OrderEntity> findOrders();

    int setOrderStatus(OrderEntity order, String status);
}
