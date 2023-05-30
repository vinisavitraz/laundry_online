package com.tads.br.order.repository;

import com.tads.br.order.entity.OrderItemEntity;

public interface OrderItemRepositoryInterface {

    Long create(OrderItemEntity orderItem);

    OrderItemEntity findById(Long id);

}
