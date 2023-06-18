package com.tads.br.user.dto.request;

public class CreateCustomerRequestDto {

    private String name;
    private String email;
    private String document;
    private String phone;
    private String cep;
    private String street;
    private String streetNumber;
    private String district;
    private String city;
    private String state;

    public CreateCustomerRequestDto(String name, String email, String document, String phone, String cep, String street, String streetNumber, String district, String city, String state) {
        this.name = name;
        this.email = email;
        this.document = document;
        this.phone = phone;
        this.cep = cep;
        this.street = street;
        this.streetNumber = streetNumber;
        this.district = district;
        this.city = city;
        this.state = state;
    }

    public CreateCustomerRequestDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    @Override
    public String toString() {
        return "CreateCustomerRequestDto{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", document='" + document + '\'' +
                ", phone='" + phone + '\'' +
                ", cep='" + cep + '\'' +
                ", street='" + street + '\'' +
                ", streetNumber='" + streetNumber + '\'' +
                ", district='" + district + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
