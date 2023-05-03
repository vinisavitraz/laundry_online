package com.tads.br.app.dto.response;

import com.tads.br.app.entity.AddressEntity;

public class AddressResponseDto {

    private AddressEntity address;

    public AddressResponseDto(AddressEntity address) {
        this.address = address;
    }

    public AddressEntity getAddress() {
        return address;
    }

    public void setAddress(AddressEntity address) {
        this.address = address;
    }

}
