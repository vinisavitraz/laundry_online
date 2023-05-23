package com.tads.br.auth.dto.response;

public class AuthResponseDto {

    private String token;

    public AuthResponseDto(String token) {
        this.token = token;
    }

    public AuthResponseDto() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
