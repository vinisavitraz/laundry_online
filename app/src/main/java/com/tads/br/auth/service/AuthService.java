package com.tads.br.auth.service;

import com.tads.br.auth.dto.request.AuthRequestDto;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.repository.UserRepositoryInterface;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepositoryInterface repository;

    public AuthService(UserRepositoryInterface repository) {
        this.repository = repository;
    }

    public UserEntity authenticate(AuthRequestDto authRequestDto) {
        return this.repository.findByEmail(authRequestDto.getEmail());
    }
}
