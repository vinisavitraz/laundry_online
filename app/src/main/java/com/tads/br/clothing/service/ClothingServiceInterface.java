package com.tads.br.clothing.service;

import com.tads.br.clothing.dto.request.CreateClothingRequestDto;
import com.tads.br.clothing.dto.request.UpdateClothingRequestDto;
import com.tads.br.clothing.entity.ClothingEntity;
import com.tads.br.commons.exception.ClothingAlreadyExistsException;

import java.util.List;

public interface ClothingServiceInterface {

    List<ClothingEntity> findAllClothings();

    ClothingEntity findClothingById(Long id);

    ClothingEntity createClothing(CreateClothingRequestDto createClothingRequestDto) throws ClothingAlreadyExistsException;

    ClothingEntity updateClothing(UpdateClothingRequestDto createClothingRequestDto) throws ClothingAlreadyExistsException;

    boolean deleteClothing(Long id);
}
