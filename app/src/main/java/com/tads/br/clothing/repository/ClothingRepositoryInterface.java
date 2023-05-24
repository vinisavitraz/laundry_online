package com.tads.br.clothing.repository;

import com.tads.br.clothing.entity.ClothingEntity;

import java.util.List;

public interface ClothingRepositoryInterface {
    List<ClothingEntity> findAll();

    ClothingEntity findById(Long id);

    ClothingEntity create(ClothingEntity clothing);

    int update(ClothingEntity clothing);

    int deleteById(Long id);
}
