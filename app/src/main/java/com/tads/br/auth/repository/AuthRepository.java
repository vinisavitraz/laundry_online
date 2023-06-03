package com.tads.br.auth.repository;

import com.tads.br.auth.entity.TokenEntity;
import com.tads.br.user.entity.UserEntity;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;

@Repository
public class AuthRepository implements AuthRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_SEQUENCE = "SELECT nextval('tokens_sequence')";
    private static final String QUERY_CREATE = "INSERT INTO tokens (id, token, expiresAt, userId) VALUES (?,?,?,?)";
    private static final String QUERY_FIND_BY_TOKEN = "SELECT * FROM tokens WHERE token = ?";
    private static final String QUERY_FIND_BY_USER = "SELECT * FROM tokens WHERE userId = ? LIMIT 1";
    private static final String QUERY_DELETE_BY_TOKEN = "DELETE FROM tokens WHERE token = ?";
    private static final String QUERY_DELETE_BY_USER = "DELETE FROM tokens WHERE userId = ?";

    public AuthRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public TokenEntity create(TokenEntity token, UserEntity user) {
        Long id = jdbcTemplate.query(AuthRepository.QUERY_SEQUENCE, rs -> {
            if (rs.next()) {
                return rs.getLong(1);
            } else {
                throw new SQLException("Unable to retrieve value from sequence tokens_sequence");
            }
        });

        jdbcTemplate.update(AuthRepository.QUERY_CREATE,
                id, token.getToken(), token.getExpiresAt(), user.getId());

        token.setId(id);

        return token;
    }

    @Override
    public TokenEntity findByToken(String token) {
        try {
            return jdbcTemplate.queryForObject(AuthRepository.QUERY_FIND_BY_TOKEN,
                    BeanPropertyRowMapper.newInstance(TokenEntity.class), token);
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public int removeTokensFromUser(UserEntity user) {
        return jdbcTemplate.update(AuthRepository.QUERY_DELETE_BY_USER, user.getId());
    }

    @Override
    public int deleteToken(TokenEntity token) {
        return jdbcTemplate.update(AuthRepository.QUERY_DELETE_BY_TOKEN, token.getToken());
    }

    @Override
    public TokenEntity findByUser(UserEntity user) {
        try {
            return jdbcTemplate.queryForObject(AuthRepository.QUERY_FIND_BY_USER,
                    BeanPropertyRowMapper.newInstance(TokenEntity.class), user.getId());
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

}
