package com.tads.br.user.repository;

import com.tads.br.user.entity.UserEntity;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository implements UserRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_FIND_BY_ID = "SELECT * FROM users WHERE id = ?";

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserEntity findById(Long id) {
        try {
            return jdbcTemplate.queryForObject(UserRepository.QUERY_FIND_BY_ID,
                    BeanPropertyRowMapper.newInstance(UserEntity.class), id);
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

}
