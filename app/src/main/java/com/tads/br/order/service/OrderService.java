package com.tads.br.order.service;

import com.tads.br.order.dto.request.CreateOrderRequestDto;
import com.tads.br.order.entity.OrderEntity;
import com.tads.br.order.entity.OrderItemEntity;
import com.tads.br.order.repository.OrderItemRepositoryInterface;
import com.tads.br.order.repository.OrderRepositoryInterface;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.service.UserServiceInterface;
import org.springframework.stereotype.Service;

import java.util.Date;
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
        OrderEntity order = this.orderRepository.findById(id);

        if (order == null) {
            return null;
        }

        List<OrderItemEntity> items = this.orderItemRepository.getOrderItemsByOrder(order);
        order.setItems(items);

        return order;
    }

    @Override
    public List<OrderEntity> getOrders() {
        List<OrderEntity> orders = this.orderRepository.findOrders();

        orders.forEach(orderEntity -> {
            orderEntity.setItems(this.orderItemRepository.getOrderItemsByOrder(orderEntity));
        });

        return orders;
    }

    @Override
    public OrderEntity createOrder(CreateOrderRequestDto createOrderRequestDto) {
        createOrderRequestDto.getEntity().setStatus("created");
        createOrderRequestDto.getEntity().setCreateDate(new Date());

        OrderEntity order = this.orderRepository.create(createOrderRequestDto.getEntity());

        createOrderRequestDto.getItems().forEach(itemEntity -> {
            itemEntity.setOrderId(order.getId());
        });

        for (OrderItemEntity item : createOrderRequestDto.getItems()) {
            order.getItems().add(this.orderItemRepository.create(item));
        }

        return order;
    }

    @Override
    public OrderEntity setOrderStatus(long id, String status) {
        OrderEntity order = this.findOrderById(id);

        if (order == null) {
            throw new RuntimeException("Order with ID " + id + " not found");
        }

        int updated = this.orderRepository.setOrderStatus(order, status);

        if (updated != 1) {
            throw new RuntimeException("Order with ID " + id + " not updated");
        }

        return this.findOrderById(id);
    }

    @Override
    public List<OrderEntity> getOrdersByCustomerAndStatus(long customerId, String status) {
        UserEntity user = this.userService.findById(customerId);

        if (user == null) {
            throw new RuntimeException("Customer with ID " + customerId + " not found");
        }

        List<OrderEntity> orders = this.orderRepository.findOrdersByCustomerAndStatus(user.getId(), status);

        orders.forEach(orderEntity -> {
            orderEntity.setItems(this.orderItemRepository.getOrderItemsByOrder(orderEntity));
        });

        return orders;
    }

    @Override
    public List<OrderEntity> getOrdersByCustomer(long customerId) {
        UserEntity user = this.userService.findById(customerId);

        if (user == null) {
            throw new RuntimeException("Customer with ID " + customerId + " not found");
        }

        List<OrderEntity> orders = this.orderRepository.findOrdersByCustomer(customerId);

        orders.forEach(orderEntity -> {
            orderEntity.setItems(this.orderItemRepository.getOrderItemsByOrder(orderEntity));
        });

        return orders;
    }

    @Override
    public List<OrderEntity> getOrdersByStatus(String status) {
        List<OrderEntity> orders = this.orderRepository.findOrdersByStatus(status);

        orders.forEach(orderEntity -> {
            orderEntity.setItems(this.orderItemRepository.getOrderItemsByOrder(orderEntity));
        });

        return orders;
    }

}
