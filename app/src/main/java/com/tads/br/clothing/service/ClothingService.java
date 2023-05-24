package com.tads.br.clothing.service;

import com.tads.br.clothing.dto.request.CreateClothingRequestDto;
import com.tads.br.clothing.dto.request.UpdateClothingRequestDto;
import com.tads.br.clothing.entity.ClothingEntity;
import com.tads.br.clothing.repository.ClothingRepositoryInterface;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public ClothingEntity createClothing(CreateClothingRequestDto createClothingRequestDto) {
        return this.repository.create(createClothingRequestDto.getEntity());
    }

    @Override
    public ClothingEntity updateClothing(UpdateClothingRequestDto updateClothingRequestDto) {
        int updated = this.repository.update(updateClothingRequestDto.getEntity());

        if (updated == 1) {
            return updateClothingRequestDto.getEntity();
        }

        return null;
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
