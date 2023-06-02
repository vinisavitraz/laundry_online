package com.tads.br.order.service;

import com.tads.br.order.dto.request.CreateOrderRequestDto;
import com.tads.br.order.entity.OrderEntity;

import java.util.List;

public interface OrderServiceInterface {

    OrderEntity findOrderById(Long id);

    List<OrderEntity> getOrdersByCustomerAndStatus(long userId, String status);

    List<OrderEntity> getOrdersByCustomer(long customerId);

    List<OrderEntity> getOrders();

    OrderEntity createOrder(CreateOrderRequestDto createOrderRequestDto);

    OrderEntity setOrderStatus(long id, String status);
}
