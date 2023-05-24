package com.tads.br.user.controller;

import com.tads.br.core.dto.response.EntityResponseDto;
import com.tads.br.user.dto.request.RegisterUserRequestDto;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.service.UserServiceInterface;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserServiceInterface service;

    public UserController(UserServiceInterface service) {
        this.service = service;
    }

    @PostMapping("/users/register")
    @ResponseBody
    public EntityResponseDto<UserEntity> registerUser(@RequestBody RegisterUserRequestDto registerUserRequestDto) {
        UserEntity user = this.service.registerUser(registerUserRequestDto);

        return new EntityResponseDto<>(user);
    }

    @GetMapping("/users/{id}")
    @ResponseBody
    public EntityResponseDto<UserEntity> getUserById(@PathVariable("id") long id) {
        UserEntity user = this.service.findById(id);

        if (user == null) {
            return new EntityResponseDto<>(null);
        }

        return new EntityResponseDto<>(user);
    }

}
