package com.tads.br.order.controller;

import com.tads.br.clothing.dto.request.UpdateClothingRequestDto;
import com.tads.br.clothing.entity.ClothingEntity;
import com.tads.br.core.dto.response.EntitiesResponseDto;
import com.tads.br.core.dto.response.EntityResponseDto;
import com.tads.br.order.dto.request.CreateOrderRequestDto;
import com.tads.br.order.entity.OrderEntity;
import com.tads.br.order.service.OrderServiceInterface;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    private final OrderServiceInterface service;

    public OrderController(OrderServiceInterface service) {
        this.service = service;
    }

    @GetMapping("/orders")
    @ResponseBody
    public EntitiesResponseDto<OrderEntity> getOrders() {
        List<OrderEntity> orders = this.service.getOrders();

        return new EntitiesResponseDto<>(orders);
    }

    @GetMapping("/orders/{id}")
    @ResponseBody
    public EntityResponseDto<OrderEntity> getOrderById(@PathVariable("id") long id) {
        OrderEntity order = this.service.findOrderById(id);

        return new EntityResponseDto<>(order);
    }

    @GetMapping("/orders/customer/{customerId}")
    @ResponseBody
    public EntitiesResponseDto<OrderEntity> getOrdersByCustomer(@PathVariable("customerId") long customerId) {
        List<OrderEntity> orders = this.service.getOrdersByCustomer(customerId);

        return new EntitiesResponseDto<>(orders);
    }

    @GetMapping("/orders/customer/{customer}/status/{status}")
    @ResponseBody
    public EntitiesResponseDto<OrderEntity> getOrdersByCustomerAndStatus(@PathVariable("customer") long customer, @PathVariable("status") String status) {
        List<OrderEntity> orders = this.service.getOrdersByCustomerAndStatus(customer, status);

        return new EntitiesResponseDto<>(orders);
    }

    @PostMapping("/orders")
    @ResponseBody
    public EntityResponseDto<OrderEntity> createOrder(@RequestBody CreateOrderRequestDto createOrderRequestDto) {
        OrderEntity order = this.service.createOrder(createOrderRequestDto);

        return new EntityResponseDto<>(order);
    }

    @PutMapping("/orders/{id}/status/{status}")
    @ResponseBody
    public EntityResponseDto<OrderEntity> setOrderStatus(@PathVariable("id") long id, @PathVariable("status") String status) {
        OrderEntity order = this.service.setOrderStatus(id, status);

        return new EntityResponseDto<>(order);
    }

}
