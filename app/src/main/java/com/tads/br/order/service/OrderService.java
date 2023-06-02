package com.tads.br.order.service;

import com.tads.br.order.dto.request.CreateOrderRequestDto;
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
    public List<OrderEntity> getOrders() {
        return this.orderRepository.findOrders();
    }

    @Override
    public OrderEntity createOrder(CreateOrderRequestDto createOrderRequestDto) {

        // let totalWashPrice: number = 0;
        // let totalWashTime: number = 0;
        // const items: OrderItem[] = [];
        //
        // for (let i = 0; i < dto.items!.length!; i++) {
        //   const item: ItemOrderRequestDto = dto.items![i];
        //
        //   const washPrice = item.clothing!.washPrice! * item.quantity!;
        //   totalWashPrice += washPrice;
        //
        //   if (item.clothing!.washTime! > totalWashTime) {
        //     totalWashTime = item.clothing!.washTime!;
        //   }
        //
        //   items.push(new OrderItem(0, item.clothing!.id, item.quantity!, washPrice));
        // }
        //
        // const order: Order = new Order(
        //     undefined,
        //     OrderStatusEnum.CREATED,
        //     totalWashPrice,
        //     totalWashTime,
        //     items,
        //     dto.entity!.customerId,
        //     new Date(),
        // );

        //
        //
        //
        // orders.push(order);
        //
        // localStorage.setItem(OrderService.ORDERS_KEY, JSON.stringify(orders));
        //
        // return of(order);
        return this.orderRepository.create(createOrderRequestDto.getEntity());
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

        return order;
    }

    @Override
    public List<OrderEntity> getOrdersByCustomerAndStatus(long customerId, String status) {
        UserEntity user = this.userService.findById(customerId);

        if (user == null) {
            throw new RuntimeException("Customer with ID " + customerId + " not found");
        }

        if ("employee".equals(user.getRole())) {
            return this.orderRepository.findOrdersByStatus(status);
        }

        return this.orderRepository.findOpenOrdersByCustomerAndStatus(user.getId(), status);
    }

    @Override
    public List<OrderEntity> getOrdersByCustomer(long customerId) {
        UserEntity user = this.userService.findById(customerId);

        if (user == null) {
            throw new RuntimeException("Customer with ID " + customerId + " not found");
        }

        return this.orderRepository.findOrdersByCustomer(customerId);
    }
}
