package com.tads.br.commons.dto.response;

public class StatusResponseDto {

    private String message;

    public StatusResponseDto(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
