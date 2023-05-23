package com.tads.br.user.service;

import com.tads.br.user.dto.request.RegisterUserRequestDto;
import com.tads.br.user.entity.UserEntity;

public interface UserServiceInterface {

    UserEntity findById(Long id);

    UserEntity findUserByEmail(String email);

    UserEntity registerUser(RegisterUserRequestDto registerUserRequestDto);
}
