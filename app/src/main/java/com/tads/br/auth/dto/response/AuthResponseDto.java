package com.tads.br.auth.dto.response;

import com.tads.br.auth.entity.TokenEntity;

public class AuthResponseDto {

    private TokenEntity token;
    private String userRole;

    public AuthResponseDto(TokenEntity token, String userRole) {
        this.token = token;
        this.userRole = userRole;
    }

    public AuthResponseDto() {
    }

    public TokenEntity getToken() {
        return token;
    }

    public void setToken(TokenEntity token) {
        this.token = token;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
