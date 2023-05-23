package com.tads.br.user.repository;

import com.tads.br.user.entity.UserEntity;

public interface UserRepositoryInterface {

    Long create(UserEntity user, String password);

    UserEntity findById(Long id);

    UserEntity findByEmail(String email);
}
