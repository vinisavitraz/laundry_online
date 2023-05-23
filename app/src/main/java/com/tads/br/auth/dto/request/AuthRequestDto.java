package com.tads.br.auth.dto.request;

public class AuthRequestDto {

    private String email;
    private String password;

    public AuthRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public AuthRequestDto() {
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
