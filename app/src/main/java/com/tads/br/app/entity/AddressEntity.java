package com.tads.br.app.entity;

import com.tads.br.app.dto.response.ViaCepResponseDto;

public class AddressEntity {

    private String cep;
    private String street;
    private String streetNumber;
    private String district;
    private String city;
    private String state;

    public AddressEntity(String cep, String street, String streetNumber, String district, String city, String state) {
        this.cep = cep;
        this.street = street;
        this.streetNumber = streetNumber;
        this.district = district;
        this.city = city;
        this.state = state;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public static AddressEntity fromProvider(ViaCepResponseDto viaCepResponseDto) {
        return new AddressEntity(
                viaCepResponseDto.getCep(),
                viaCepResponseDto.getLogradouro(),
                "",
                viaCepResponseDto.getBairro(),
                viaCepResponseDto.getLocalidade(),
                viaCepResponseDto.getUf()
        );
    }
}
