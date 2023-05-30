package com.tads.br.user.service;

import com.tads.br.clothing.entity.ClothingEntity;
import com.tads.br.user.dto.request.RegisterUserRequestDto;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.repository.UserRepositoryInterface;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public UserEntity findUserByEmail(String email) {
        return this.repository.findByEmail(email);
    }

    @Override
    public UserEntity registerUser(RegisterUserRequestDto registerUserRequestDto) {
        String password = this.generatePassword();

        Long userId = this.repository.create(registerUserRequestDto.getEntity(), password);

        return this.repository.findById(userId);
    }

    private String generatePassword() {
        return "123";
    }

    @Override
    public List<UserEntity> findEmployees() {
        return this.repository.findEmployees();
    }

}
