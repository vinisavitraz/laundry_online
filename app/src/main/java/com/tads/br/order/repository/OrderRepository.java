package com.tads.br.order.repository;

import com.tads.br.order.entity.OrderEntity;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class OrderRepository implements OrderRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_SEQUENCE = "SELECT nextval('orders_sequence')";
    private static final String QUERY_CREATE = "INSERT INTO orders (id, status, washPrice, washTime, createDate, paymentDate, customerId) VALUES (?,?,?,?,?,?,?)";
    private static final String QUERY_UPDATE = "UPDATE orders SET status = ? WHERE id = ?";
    private static final String QUERY_FIND_BY_ID = "SELECT * FROM orders WHERE id = ?";
    private static final String QUERY_FIND_OPEN_ORDERS = "SELECT * FROM orders WHERE status = ?";
    private static final String QUERY_FIND_ORDERS_BY_CUSTOMER = "SELECT * FROM orders WHERE customerId = ?";
    private static final String QUERY_FIND_OPEN_ORDERS_BY_CUSTOMER = "SELECT * FROM orders WHERE customerId = ? AND status = ?";
    private static final String QUERY_ORDERS = "SELECT * FROM orders";

    public OrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public OrderEntity create(OrderEntity order) {
        Long id = jdbcTemplate.query(OrderRepository.QUERY_SEQUENCE, rs -> {
            if (rs.next()) {
                return rs.getLong(1);
            } else {
                throw new SQLException("Unable to retrieve value from sequence users_sequence");
            }
        });

        jdbcTemplate.update(OrderRepository.QUERY_CREATE,
                id, order.getStatus(), order.getWashPrice(), order.getWashTime(), order.getCreateDate(), order.getPaymentDate(), order.getCustomerId());

        order.setId(id);

        return order;
    }

    @Override
    public OrderEntity findById(Long id) {
        try {
            return jdbcTemplate.queryForObject(OrderRepository.QUERY_FIND_BY_ID,
                    BeanPropertyRowMapper.newInstance(OrderEntity.class), id);
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<OrderEntity> findOrdersByStatus(String status) {
        return jdbcTemplate.query(OrderRepository.QUERY_FIND_OPEN_ORDERS, BeanPropertyRowMapper.newInstance(OrderEntity.class), status);
    }

    @Override
    public List<OrderEntity> findOrdersByCustomer(Long customerId) {
        return jdbcTemplate.query(OrderRepository.QUERY_FIND_ORDERS_BY_CUSTOMER, BeanPropertyRowMapper.newInstance(OrderEntity.class), customerId);
    }

    @Override
    public List<OrderEntity> findOrdersByCustomerAndStatus(Long customerId, String status) {
        return jdbcTemplate.query(OrderRepository.QUERY_FIND_OPEN_ORDERS_BY_CUSTOMER, BeanPropertyRowMapper.newInstance(OrderEntity.class), customerId, status);
    }

    @Override
    public List<OrderEntity> findOrders() {
        return jdbcTemplate.query(OrderRepository.QUERY_ORDERS, BeanPropertyRowMapper.newInstance(OrderEntity.class));
    }

    @Override
    public int setOrderStatus(OrderEntity order, String status) {
        return jdbcTemplate.update(OrderRepository.QUERY_UPDATE,
                status, order.getId());
    }

}
