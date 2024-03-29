package com.tads.br.order.repository;

import com.tads.br.order.entity.OrderEntity;
import com.tads.br.order.entity.OrderItemEntity;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class OrderItemRepository implements OrderItemRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_SEQUENCE = "SELECT nextval('order_items_sequence')";
    private static final String QUERY_CREATE = "INSERT INTO order_items (id, totalQuantity, totalWashPrice, clothingId, orderId) VALUES (?,?,?,?, ?)";
    private static final String QUERY_FIND_BY_ID = "SELECT item.*, c.name FROM order_items AS item LEFT JOIN clothings c ON item.clothingId = c.id WHERE id = ?";
    private static final String QUERY_FIND_BY_ORDER_ID = "SELECT item.*, c.name AS name FROM order_items AS item LEFT JOIN clothings c ON item.clothingId = c.id WHERE orderId = ?";

    public OrderItemRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public OrderItemEntity create(OrderItemEntity orderItem) {
        Long id = jdbcTemplate.query(OrderItemRepository.QUERY_SEQUENCE, rs -> {
            if (rs.next()) {
                return rs.getLong(1);
            } else {
                throw new SQLException("Unable to retrieve value from sequence users_sequence");
            }
        });

        jdbcTemplate.update(OrderItemRepository.QUERY_CREATE,
                id, orderItem.getTotalQuantity(), orderItem.getTotalWashPrice(), orderItem.getClothingId(), orderItem.getOrderId());

        orderItem.setId(id);

        return orderItem;
    }

    @Override
    public OrderItemEntity findById(Long id) {
        try {
            return jdbcTemplate.queryForObject(OrderItemRepository.QUERY_FIND_BY_ID,
                    BeanPropertyRowMapper.newInstance(OrderItemEntity.class), id);
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<OrderItemEntity> getOrderItemsByOrder(OrderEntity order) {
        return jdbcTemplate.query(OrderItemRepository.QUERY_FIND_BY_ORDER_ID, BeanPropertyRowMapper.newInstance(OrderItemEntity.class), order.getId());
    }
}
