package com.tads.br.auth.repository;

import com.tads.br.auth.entity.TokenEntity;
import com.tads.br.user.entity.UserEntity;

public interface AuthRepositoryInterface {

    TokenEntity create(TokenEntity token, UserEntity user);

    TokenEntity findByToken(String token);

    int removeTokensFromUser(UserEntity user);

    TokenEntity findByUser(UserEntity user);
}
