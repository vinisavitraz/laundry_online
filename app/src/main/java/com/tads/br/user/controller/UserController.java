package com.tads.br.user.controller;

import com.tads.br.commons.dto.response.EntitiesResponseDto;
import com.tads.br.commons.dto.response.EntityResponseDto;
import com.tads.br.commons.dto.response.ErrorResponseDto;
import com.tads.br.commons.dto.response.StatusResponseDto;
import com.tads.br.commons.exception.ClothingAlreadyExistsException;
import com.tads.br.commons.exception.UserWithDocumentAlreadyExistsException;
import com.tads.br.commons.exception.UserWithEmailAlreadyExistsException;
import com.tads.br.user.dto.request.CreateEmployeeRequestDto;
import com.tads.br.user.dto.request.CreateCustomerRequestDto;
import com.tads.br.user.dto.request.UpdateEmployeeRequestDto;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.service.UserServiceInterface;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserServiceInterface service;

    public UserController(UserServiceInterface service) {
        this.service = service;
    }

    @GetMapping("/users/{id}")
    @ResponseBody
    public EntityResponseDto<UserEntity> getUserById(@PathVariable("id") long id) {
        UserEntity user = this.service.findById(id);

        if (user == null) {
            return new EntityResponseDto<>(null);
        }

        return new EntityResponseDto<>(user);
    }

    @GetMapping("/users/employees")
    @ResponseBody
    public EntitiesResponseDto<UserEntity> getEmployees() {
        List<UserEntity> users = this.service.findEmployees();

        return new EntitiesResponseDto<>(users);
    }

    @DeleteMapping("/users/{id}")
    @ResponseBody
    public StatusResponseDto deleteUserById(@PathVariable("id") long id) {
        this.service.deleteUserById(id);

        return new StatusResponseDto("deleted");
    }

    @PostMapping("/users/customer")
    @ResponseBody
    public EntityResponseDto<UserEntity> createCustomer(@RequestBody CreateCustomerRequestDto createCustomerRequestDto) throws UserWithEmailAlreadyExistsException, UserWithDocumentAlreadyExistsException {
        UserEntity user = this.service.createCustomer(createCustomerRequestDto);

        return new EntityResponseDto<>(user);
    }

    @ResponseStatus(value= HttpStatus.CONFLICT)
    @ExceptionHandler({UserWithEmailAlreadyExistsException.class})
    public @ResponseBody ErrorResponseDto handleUserWithEmailAlreadyExistsException(HttpServletRequest request, Exception ex){
        return new ErrorResponseDto(ex.getMessage());
    }

    @ResponseStatus(value= HttpStatus.CONFLICT)
    @ExceptionHandler({UserWithDocumentAlreadyExistsException.class})
    public @ResponseBody ErrorResponseDto handleUserWithDocumentAlreadyExistsException(HttpServletRequest request, Exception ex){
        return new ErrorResponseDto(ex.getMessage());
    }

    @PostMapping("/users/employee")
    @ResponseBody
    public EntityResponseDto<UserEntity> createEmployee(@RequestBody CreateEmployeeRequestDto createEmployeeRequestDto) throws UserWithEmailAlreadyExistsException {
        System.out.println(createEmployeeRequestDto);
        UserEntity user = this.service.createEmployee(createEmployeeRequestDto);

        return new EntityResponseDto<>(user);
    }

    @PutMapping("/users/employee")
    @ResponseBody
    public EntityResponseDto<UserEntity> updateEmployee(@RequestBody UpdateEmployeeRequestDto updateClothingRequestDto) throws UserWithEmailAlreadyExistsException {
        System.out.println(updateClothingRequestDto);
        UserEntity user = this.service.updateEmployee(updateClothingRequestDto);

        return new EntityResponseDto<>(user);
    }
}
