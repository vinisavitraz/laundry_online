package com.tads.br.auth.entity;

import java.util.Date;

public class TokenEntity {
    private Long id;
    private String token;
    private Date expiresAt;
    private Long userId;

    public TokenEntity(Long id, String token, Date expiresAt, Long userId) {
        this.id = id;
        this.token = token;
        this.expiresAt = expiresAt;
        this.userId = userId;
    }

    public TokenEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
