package com.tads.br.order.repository;

import com.tads.br.order.entity.OrderEntity;
import com.tads.br.order.entity.OrderItemEntity;

import java.util.List;

public interface OrderItemRepositoryInterface {

    Long create(OrderItemEntity orderItem);

    OrderItemEntity findById(Long id);

    List<OrderItemEntity> getOrderItemsByOrder(OrderEntity order);
}
