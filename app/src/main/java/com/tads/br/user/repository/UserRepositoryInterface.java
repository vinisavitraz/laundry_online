package com.tads.br.user.repository;

import com.tads.br.user.entity.UserEntity;

public interface UserRepositoryInterface {
    UserEntity findById(Long id);
}
