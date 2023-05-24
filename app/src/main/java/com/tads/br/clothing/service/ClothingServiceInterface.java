package com.tads.br.clothing.service;

import com.tads.br.clothing.dto.request.CreateClothingRequestDto;
import com.tads.br.clothing.dto.request.UpdateClothingRequestDto;
import com.tads.br.clothing.entity.ClothingEntity;

import java.util.List;

public interface ClothingServiceInterface {

    List<ClothingEntity> findAllClothings();

    ClothingEntity findClothingById(Long id);

    ClothingEntity createClothing(CreateClothingRequestDto createClothingRequestDto);

    ClothingEntity updateClothing(UpdateClothingRequestDto createClothingRequestDto);

    boolean deleteClothing(Long id);
}
