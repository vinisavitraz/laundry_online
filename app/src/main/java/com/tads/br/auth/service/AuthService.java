package com.tads.br.auth.service;

import com.tads.br.auth.entity.TokenEntity;
import com.tads.br.auth.provider.UserAuthProvider;
import com.tads.br.auth.repository.AuthRepositoryInterface;
import com.tads.br.user.entity.UserEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public class AuthService implements AuthServiceInterface {

    private final UserAuthProvider userAuthProvider;
    private final AuthRepositoryInterface repository;

    public AuthService(AuthRepositoryInterface repository, UserAuthProvider userAuthProvider) {
        this.repository = repository;
        this.userAuthProvider = userAuthProvider;
    }

    public TokenEntity createToken(UserEntity user) {
        TokenEntity tokenDb = this.repository.findByUser(user);

        if (tokenDb != null) {
            return tokenDb;
        }

        TokenEntity token = this.userAuthProvider.buildToken(user);

        return this.repository.create(token, user);
    }

    public boolean deleteToken(TokenEntity token) {
        int deleted = this.repository.deleteToken(token);

        if (deleted == 1) {
            return true;
        }

        return false;
    }

    public TokenEntity getToken(String token) {
        return this.repository.findByToken(token);
    }

    public void logoutUser(UserEntity user) {
        this.repository.removeTokensFromUser(user);
    }
}
