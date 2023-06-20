package com.tads.br.clothing.repository;

import com.tads.br.clothing.entity.ClothingEntity;
import org.postgresql.util.PSQLException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
public class ClothingRepository implements ClothingRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_SEQUENCE = "SELECT nextval('clothings_sequence')";
    private static final String QUERY_CREATE = "INSERT INTO clothings (id, name, washPrice, washTime) VALUES (?,?,?,?)";
    private static final String QUERY_UPDATE = "UPDATE clothings SET name = ?, washPrice = ?, washTime = ? WHERE id = ?";
    private static final String QUERY_DELETE = "DELETE FROM clothings WHERE id = ?";
    private static final String QUERY_FIND_ALL = "SELECT * FROM clothings ORDER BY id";
    private static final String QUERY_FIND_BY_ID = "SELECT * FROM clothings WHERE id = ?";

    public ClothingRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<ClothingEntity> findAll() {
        return jdbcTemplate.query(ClothingRepository.QUERY_FIND_ALL, BeanPropertyRowMapper.newInstance(ClothingEntity.class));
    }

    @Override
    public ClothingEntity findById(Long id) {
        try {
            return jdbcTemplate.queryForObject(ClothingRepository.QUERY_FIND_BY_ID,
                    BeanPropertyRowMapper.newInstance(ClothingEntity.class), id);
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public ClothingEntity create(ClothingEntity clothing) {
        Long id = jdbcTemplate.query(ClothingRepository.QUERY_SEQUENCE, rs -> {
            if (rs.next()) {
                return rs.getLong(1);
            } else {
                throw new SQLException("Unable to retrieve value from sequence clothings_sequence");
            }
        });

        jdbcTemplate.update(ClothingRepository.QUERY_CREATE,
                id, clothing.getName(), clothing.getWashPrice(), clothing.getWashTime());

        clothing.setId(id);

        return clothing;
    }

    @Override
    public int update(ClothingEntity clothing) {
        return jdbcTemplate.update(ClothingRepository.QUERY_UPDATE,
                clothing.getName(), clothing.getWashPrice(), clothing.getWashTime(), clothing.getId());
    }

    @Override
    public int deleteById(Long id) {
        return jdbcTemplate.update(ClothingRepository.QUERY_DELETE, id);
    }
}

