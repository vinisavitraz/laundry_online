package com.tads.br.user.repository;

import com.tads.br.user.entity.UserEntity;

import java.util.List;

public interface UserRepositoryInterface {

    Long create(UserEntity user, String password);

    UserEntity findById(Long id);

    UserEntity findByEmail(String email);

    List<UserEntity> findEmployees();

}
