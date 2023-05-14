package com.tads.br.user.dto.request;

public class AuthUserRequestDto {

    private String email;
    private String password;

    public AuthUserRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public AuthUserRequestDto() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
