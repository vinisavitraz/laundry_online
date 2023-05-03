package com.tads.br.user.service;

import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.repository.UserRepositoryInterface;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepositoryInterface repository;

    public UserService(UserRepositoryInterface repository) {
        this.repository = repository;
    }

    @Override
    public UserEntity findById(Long id) {
        return this.repository.findById(id);
    }

}
