package com.tads.br.order.service;

import com.tads.br.order.entity.OrderEntity;
import com.tads.br.order.repository.OrderItemRepositoryInterface;
import com.tads.br.order.repository.OrderRepositoryInterface;
import org.springframework.stereotype.Service;

@Service
public class OrderService implements OrderServiceInterface {

    private final OrderRepositoryInterface orderRepository;
    private final OrderItemRepositoryInterface orderItemRepository;

    public OrderService(OrderRepositoryInterface orderRepository, OrderItemRepositoryInterface orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderEntity findOrderById(Long id) {
        return this.orderRepository.findById(id);
    }
}
