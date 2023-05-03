package com.tads.br.user.controller;

import com.tads.br.core.dto.response.EntityResponseDto;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.service.UserServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserServiceInterface service;

    public UserController(UserServiceInterface service) {
        this.service = service;
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public EntityResponseDto<UserEntity> getUserById(@PathVariable("id") long id) {
        UserEntity user = this.service.findById(id);

        if (user == null) {
            return new EntityResponseDto<>(null);
        }

        return new EntityResponseDto<>(user);
    }

}
