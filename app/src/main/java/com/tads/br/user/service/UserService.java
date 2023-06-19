package com.tads.br.user.service;

import com.tads.br.email.service.EmailServiceInterface;
import com.tads.br.user.dto.request.CreateEmployeeRequestDto;
import com.tads.br.user.dto.request.CreateCustomerRequestDto;
import com.tads.br.user.dto.request.UpdateEmployeeRequestDto;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.repository.UserRepositoryInterface;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepositoryInterface repository;
    private final EmailServiceInterface emailServiceInterface;

    public UserService(UserRepositoryInterface repository, EmailServiceInterface emailServiceInterface) {
        this.repository = repository;
        this.emailServiceInterface = emailServiceInterface;
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

        try {
            String salt = this.generateSalt();
            String hashPassword = this.hashPassword(password, salt.getBytes());

            UserEntity user = new UserEntity();
            user.setName(createCustomerRequestDto.getName());
            user.setEmail(createCustomerRequestDto.getEmail());
            user.setPasswordHash(hashPassword);
            user.setPasswordSalt(salt);
            user.setDocument(createCustomerRequestDto.getDocument().replace(".", "").replace("-", ""));
            user.setPhone(createCustomerRequestDto.getPhone());
            user.setCep(createCustomerRequestDto.getCep().replace("-", ""));
            user.setStreet(createCustomerRequestDto.getStreet());
            user.setStreetNumber(createCustomerRequestDto.getStreetNumber());
            user.setDistrict(createCustomerRequestDto.getDistrict());
            user.setCity(createCustomerRequestDto.getCity());
            user.setState(createCustomerRequestDto.getState());
            user.setRole("customer");

            Long customerId = this.repository.createUser(user);

            this.emailServiceInterface.sendEmailNewUser(user.getEmail(), password);

            return this.repository.findById(customerId);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
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
        DateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy");

        try {
            String salt = this.generateSalt();
            String hashPassword = this.hashPassword(createEmployeeRequestDto.getPassword(), salt.getBytes());

            UserEntity user = new UserEntity();
            user.setName(createEmployeeRequestDto.getName());
            user.setEmail(createEmployeeRequestDto.getEmail());
            user.setPasswordHash(hashPassword);
            user.setPasswordSalt(salt);
            user.setBirthDate(dateFormatter.parse(createEmployeeRequestDto.getBirthDate()));
            user.setRole("employee");

            Long employeeId = this.repository.createUser(user);

            return this.repository.findById(employeeId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public UserEntity updateEmployee(UpdateEmployeeRequestDto updateEmployeeRequestDto) {
        int updated = this.repository.update(updateEmployeeRequestDto.getEntity());

        if (updated == 1) {
            return updateEmployeeRequestDto.getEntity();
        }

        return null;
    }

    private String generateSalt() throws NoSuchAlgorithmException {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        StringBuilder sb = new StringBuilder();

        for(int i=0; i< salt.length ;i++) {
            sb.append(Integer.toString((salt[i] & 0xff) + 0x100, 16).substring(1));
        }

        return sb.toString();
    }

    @Override
    public String hashPassword(String password, byte[] salt) {

        String generatedPassword = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] bytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return generatedPassword;
    }

    private String generatePassword() {
        StringBuilder password = new StringBuilder();
        int min = 0;
        int max = 9;

        for (int i = 0; i < 6; i++) {
            int randomNumber = (int) Math.floor(Math.random() * (max - min + 1) + min);
            password.append(randomNumber);
        }

        return password.toString();
    }
}
