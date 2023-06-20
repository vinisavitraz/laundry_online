package com.tads.br.clothing.service;

import com.tads.br.clothing.dto.request.CreateClothingRequestDto;
import com.tads.br.clothing.dto.request.UpdateClothingRequestDto;
import com.tads.br.clothing.entity.ClothingEntity;
import com.tads.br.clothing.repository.ClothingRepository;
import com.tads.br.clothing.repository.ClothingRepositoryInterface;
import com.tads.br.commons.exception.ClothingAlreadyExistsException;
import com.tads.br.commons.exception.UserWithEmailAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ClothingService implements ClothingServiceInterface {

    private final ClothingRepositoryInterface repository;

    public ClothingService(ClothingRepositoryInterface repository) {
        this.repository = repository;
    }

    @Override
    public List<ClothingEntity> findAllClothings() {
        return this.repository.findAll();
    }

    @Override
    public ClothingEntity findClothingById(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public ClothingEntity createClothing(CreateClothingRequestDto createClothingRequestDto) throws ClothingAlreadyExistsException {

        try {
            return this.repository.create(createClothingRequestDto.getEntity());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());

            if (e.getMessage().contains("duplicate key value violates unique constraint")) {
                throw new ClothingAlreadyExistsException(createClothingRequestDto.getEntity().getName());
            }

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro criando roupa");
        }
    }

    @Override
    public ClothingEntity updateClothing(UpdateClothingRequestDto updateClothingRequestDto) throws ClothingAlreadyExistsException {
        try {
            int updated = this.repository.update(updateClothingRequestDto.getEntity());

            if (updated == 1) {
                return updateClothingRequestDto.getEntity();
            }

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro atualizando roupa");
        } catch (Exception e) {
            if (e.getMessage().contains("duplicate key value violates unique constraint")) {
                throw new ClothingAlreadyExistsException(updateClothingRequestDto.getEntity().getName());
            }

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro atualizando roupa");
        }
    }

    @Override
    public boolean deleteClothing(Long id) {
        int deleted = this.repository.deleteById(id);

        if (deleted == 1) {
            return true;
        }

        return false;
    }
}
