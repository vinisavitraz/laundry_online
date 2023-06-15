package com.tads.br.user.service;

import com.tads.br.user.dto.request.CreateEmployeeRequestDto;
import com.tads.br.user.dto.request.CreateCustomerRequestDto;
import com.tads.br.user.dto.request.UpdateEmployeeRequestDto;
import com.tads.br.user.entity.UserEntity;

import java.util.List;

public interface UserServiceInterface {

    UserEntity findById(Long id);

    UserEntity findUserByEmail(String email);

    UserEntity createCustomer(CreateCustomerRequestDto createCustomerRequestDto);

    List<UserEntity> findEmployees();

    boolean deleteUserById(Long id);

    UserEntity createEmployee(CreateEmployeeRequestDto createClothingRequestDto);

    UserEntity updateEmployee(UpdateEmployeeRequestDto updateClothingRequestDto);

    String hashPassword(String password, byte[] salt);

}
