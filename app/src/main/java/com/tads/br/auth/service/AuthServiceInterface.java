package com.tads.br.auth.service;

import com.tads.br.auth.entity.TokenEntity;
import com.tads.br.user.entity.UserEntity;

public interface AuthServiceInterface {

    TokenEntity createToken(UserEntity user);

    boolean deleteToken(TokenEntity token);

    TokenEntity getToken(String token);

    void logoutUser(UserEntity user);

}
