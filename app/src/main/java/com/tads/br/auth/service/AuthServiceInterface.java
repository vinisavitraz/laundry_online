package com.tads.br.auth.service;

import com.tads.br.auth.entity.TokenEntity;
import com.tads.br.user.entity.UserEntity;

public interface AuthServiceInterface {

    TokenEntity createToken(UserEntity user);

    TokenEntity getToken(String token);

    void logoutUser(UserEntity user);

}
