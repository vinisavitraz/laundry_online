package com.tads.br.order.repository;

import com.tads.br.order.entity.OrderEntity;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;

@Repository
public class OrderRepository implements OrderRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_SEQUENCE = "SELECT nextval('orders_sequence')";
    private static final String QUERY_CREATE = "INSERT INTO orders (id, status, washPrice, washTime, createDate, paymentDate, customerId, employeeId) VALUES (?,?,?,?,?,?,?,?)";
    private static final String QUERY_FIND_BY_ID = "SELECT * FROM orders WHERE id = ?";

    public OrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Long create(OrderEntity order) {
        Long id = jdbcTemplate.query(OrderRepository.QUERY_SEQUENCE, rs -> {
            if (rs.next()) {
                return rs.getLong(1);
            } else {
                throw new SQLException("Unable to retrieve value from sequence users_sequence");
            }
        });

        jdbcTemplate.update(OrderRepository.QUERY_CREATE,
                id, order.getStatus(), order.getWashPrice(), order.getWashTime(), order.getCreateDate(), order.getPaymentDate(), order.getCustomerId(), order.getEmployeeId());

        return id;
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
}
