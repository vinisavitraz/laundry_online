package com.tads.br.order.repository;

import com.tads.br.order.entity.OrderEntity;

public interface OrderRepositoryInterface {

    Long create(OrderEntity order);

    OrderEntity findById(Long id);

}
