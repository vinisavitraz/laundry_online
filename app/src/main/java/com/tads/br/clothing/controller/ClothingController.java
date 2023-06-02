package com.tads.br.clothing.controller;

import com.tads.br.clothing.dto.request.CreateClothingRequestDto;
import com.tads.br.clothing.dto.request.UpdateClothingRequestDto;
import com.tads.br.clothing.entity.ClothingEntity;
import com.tads.br.clothing.service.ClothingServiceInterface;
import com.tads.br.commons.dto.response.EntitiesResponseDto;
import com.tads.br.commons.dto.response.EntityResponseDto;
import com.tads.br.commons.dto.response.StatusResponseDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClothingController {

    private final ClothingServiceInterface service;

    public ClothingController(ClothingServiceInterface service) {
        this.service = service;
    }

    @GetMapping("/clothings")
    @ResponseBody
    public EntitiesResponseDto<ClothingEntity> getClothings() {
        List<ClothingEntity> clothings = this.service.findAllClothings();

        return new EntitiesResponseDto<>(clothings);
    }

    @GetMapping("/clothings/{id}")
    @ResponseBody
    public EntityResponseDto<ClothingEntity> getClothingById(@PathVariable("id") long id) {
        ClothingEntity clothing = this.service.findClothingById(id);

        return new EntityResponseDto<>(clothing);
    }

    @PostMapping("/clothings")
    @ResponseBody
    public EntityResponseDto<ClothingEntity> createClothing(@RequestBody CreateClothingRequestDto createClothingRequestDto) {
        ClothingEntity clothing = this.service.createClothing(createClothingRequestDto);

        return new EntityResponseDto<>(clothing);
    }

    @PutMapping("/clothings")
    @ResponseBody
    public EntityResponseDto<ClothingEntity> updateClothing(@RequestBody UpdateClothingRequestDto updateClothingRequestDto) {
        ClothingEntity clothing = this.service.updateClothing(updateClothingRequestDto);

        return new EntityResponseDto<>(clothing);
    }

    @DeleteMapping("/clothings/{id}")
    @ResponseBody
    public StatusResponseDto deleteClothingById(@PathVariable("id") long id) {
        this.service.deleteClothing(id);

        return new StatusResponseDto("deleted");
    }
}
