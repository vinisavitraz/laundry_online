package com.tads.br.user.service;

import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public UserEntity findById(Long id) {
        return this.repository.findById(id);
    }
}
