package com.tads.br.user.repository;

import com.tads.br.user.entity.UserEntity;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserRepository implements UserRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_SEQUENCE = "SELECT nextval('users_sequence')";
    private static final String QUERY_CREATE = "INSERT INTO users (id, name, email, role, passwordHash, passwordSalt, document, phone, cep, street, streetNumber, district, city, state, birthDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    private static final String QUERY_UPDATE = "UPDATE users SET name = ?, email = ?, passwordHash = ?, passwordSalt = ? WHERE id = ?";
    private static final String QUERY_FIND_BY_ID = "SELECT * FROM users WHERE id = ?";
    private static final String QUERY_FIND_BY_EMAIL = "SELECT * FROM users WHERE email = ?";
    private static final String QUERY_FIND_EMPLOYEES = "SELECT * FROM users WHERE role = 'employee'";
    private static final String QUERY_DELETE = "DELETE FROM users WHERE id = ?";

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Long createUser(UserEntity user) {
        Long id = jdbcTemplate.query(UserRepository.QUERY_SEQUENCE, rs -> {
            if (rs.next()) {
                return rs.getLong(1);
            } else {
                throw new SQLException("Unable to retrieve value from sequence users_sequence");
            }
        });

        jdbcTemplate.update(UserRepository.QUERY_CREATE,
                id, user.getName(), user.getEmail(), user.getRole(), user.getPasswordHash(), user.getPasswordSalt(), user.getDocument(), user.getPhone(), user.getCep(), user.getStreet(), user.getStreetNumber(), user.getDistrict(), user.getCity(), user.getState(), user.getBirthDate());

        return id;
    }

    @Override
    public int update(UserEntity user) {
        return jdbcTemplate.update(UserRepository.QUERY_UPDATE,
                user.getName(), user.getEmail(), user.getPasswordHash(), user.getPasswordSalt(), user.getId());
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

    @Override
    public UserEntity findByEmail(String email) {
        try {
            return jdbcTemplate.queryForObject(UserRepository.QUERY_FIND_BY_EMAIL,
                    BeanPropertyRowMapper.newInstance(UserEntity.class), email);
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<UserEntity> findEmployees() {
        return jdbcTemplate.query(UserRepository.QUERY_FIND_EMPLOYEES, BeanPropertyRowMapper.newInstance(UserEntity.class));
    }

    @Override
    public int deleteById(Long id) {
        return jdbcTemplate.update(UserRepository.QUERY_DELETE, id);
    }

}
