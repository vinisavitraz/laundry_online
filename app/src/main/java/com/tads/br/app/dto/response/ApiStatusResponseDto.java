package com.tads.br.app.dto.response;

public class ApiStatusResponseDto {

    private String status;

    public ApiStatusResponseDto(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
