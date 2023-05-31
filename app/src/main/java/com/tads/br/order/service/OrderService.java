package com.tads.br.order.service;

import com.tads.br.order.entity.OrderEntity;
import com.tads.br.order.repository.OrderItemRepositoryInterface;
import com.tads.br.order.repository.OrderRepositoryInterface;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.service.UserServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements OrderServiceInterface {

    private final OrderRepositoryInterface orderRepository;
    private final OrderItemRepositoryInterface orderItemRepository;
    private final UserServiceInterface userService;

    public OrderService(OrderRepositoryInterface orderRepository, OrderItemRepositoryInterface orderItemRepository, UserServiceInterface userService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userService = userService;
    }

    @Override
    public OrderEntity findOrderById(Long id) {
        return this.orderRepository.findById(id);
    }

    @Override
    public List<OrderEntity> getOrdersByUserAndStatus(long userId, String status) {
        UserEntity user = this.userService.findById(userId);

        if (user == null) {
            throw new RuntimeException("User with ID " + userId + " not found");
        }

        if ("employee".equals(user.getRole())) {
            return this.orderRepository.findOrdersByStatus(status);
        }

        return this.orderRepository.findOpenOrdersByCustomerAndStatus(user.getId(), status);
    }
}
