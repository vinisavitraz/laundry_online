package com.tads.br.user.repository;

import com.tads.br.user.entity.UserEntity;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.SQLException;

@Repository
public class UserRepository implements UserRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_SEQUENCE = "SELECT nextval('users_sequence')";
    private static final String QUERY_CREATE = "INSERT INTO users (id, name, email, role, password) VALUES (?,?,?,?,?)";
    private static final String QUERY_FIND_BY_ID = "SELECT * FROM users WHERE id = ?";
    private static final String QUERY_FIND_BY_EMAIL = "SELECT * FROM users WHERE email = ?";

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Long create(UserEntity user, String password) {
        Long id = jdbcTemplate.query(UserRepository.QUERY_SEQUENCE, rs -> {
            if (rs.next()) {
                return rs.getLong(1);
            } else {
                throw new SQLException("Unable to retrieve value from sequence users_sequence");
            }
        });

        jdbcTemplate.update(UserRepository.QUERY_CREATE,
                id, user.getName(), user.getEmail(), password);

        return id;
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

//    @Override
//    public int update(Tutorial tutorial) {
//        return jdbcTemplate.update("UPDATE tutorials SET title=?, description=?, published=? WHERE id=?",
//                new Object[] { tutorial.getTitle(), tutorial.getDescription(), tutorial.isPublished(), tutorial.getId() });
//    }
//
//    @Override
//    public int deleteById(Long id) {
//        return jdbcTemplate.update("DELETE FROM tutorials WHERE id=?", id);
//    }
//
//    @Override
//    public List<Tutorial> findAll() {
//        return jdbcTemplate.query("SELECT * from tutorials", BeanPropertyRowMapper.newInstance(Tutorial.class));
//    }
//
//    @Override
//    public List<Tutorial> findByPublished(boolean published) {
//        return jdbcTemplate.query("SELECT * from tutorials WHERE published=?",
//                BeanPropertyRowMapper.newInstance(Tutorial.class), published);
//    }
//
//    @Override
//    public List<Tutorial> findByTitleContaining(String title) {
//        String q = "SELECT * from tutorials WHERE title LIKE '%" + title + "%'";
//
//        return jdbcTemplate.query(q, BeanPropertyRowMapper.newInstance(Tutorial.class));
//    }
//
//    @Override
//    public int deleteAll() {
//        return jdbcTemplate.update("DELETE from tutorials");
//    }
}
