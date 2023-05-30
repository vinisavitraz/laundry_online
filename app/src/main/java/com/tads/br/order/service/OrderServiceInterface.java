package com.tads.br.order.service;

import com.tads.br.order.entity.OrderEntity;

public interface OrderServiceInterface {

    OrderEntity findOrderById(Long id);

}
