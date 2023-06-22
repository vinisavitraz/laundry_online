package com.tads.br.user.repository;

import com.tads.br.user.entity.UserEntity;

import java.util.List;

public interface UserRepositoryInterface {

    Long createUser(UserEntity user);

    int updateEmployee(UserEntity user);

    UserEntity findById(Long id);

    UserEntity findByEmail(String email);

    List<UserEntity> findEmployees();

    int deleteById(Long id);
}
