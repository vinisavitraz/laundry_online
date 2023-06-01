package com.tads.br.user.service;

import com.tads.br.user.dto.request.CreateEmployeeRequestDto;
import com.tads.br.user.dto.request.CreateCustomerRequestDto;
import com.tads.br.user.dto.request.UpdateEmployeeRequestDto;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.repository.UserRepositoryInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepositoryInterface repository;

    public UserService(UserRepositoryInterface repository) {
        this.repository = repository;
    }

    @Override
    public UserEntity findById(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return this.repository.findByEmail(email);
    }

    @Override
    public UserEntity createCustomer(CreateCustomerRequestDto createCustomerRequestDto) {
        String password = this.generatePassword();

        createCustomerRequestDto.getEntity().setPassword(password);

        Long customerId = this.repository.createUser(createCustomerRequestDto.getEntity());

        return this.repository.findById(customerId);
    }

    private String generatePassword() {
        return "123";
    }

    @Override
    public List<UserEntity> findEmployees() {
        return this.repository.findEmployees();
    }

    @Override
    public boolean deleteUserById(Long id) {
        int deleted = this.repository.deleteById(id);

        if (deleted == 1) {
            return true;
        }

        return false;
    }

    @Override
    public UserEntity createEmployee(CreateEmployeeRequestDto createEmployeeRequestDto) {
        Long employeeId = this.repository.createUser(createEmployeeRequestDto.getEntity());

        return this.repository.findById(employeeId);
    }

    @Override
    public UserEntity updateEmployee(UpdateEmployeeRequestDto updateEmployeeRequestDto) {
        int updated = this.repository.update(updateEmployeeRequestDto.getEntity());

        if (updated == 1) {
            return updateEmployeeRequestDto.getEntity();
        }

        return null;
    }
}
