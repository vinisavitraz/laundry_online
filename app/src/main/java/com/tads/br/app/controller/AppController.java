package com.tads.br.app.controller;

import com.tads.br.app.dto.response.AddressResponseDto;
import com.tads.br.app.dto.response.ApiStatusResponseDto;
import com.tads.br.app.entity.AddressEntity;
import com.tads.br.app.service.AppServiceInterface;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class AppController {

    private final AppServiceInterface service;

    public AppController(AppServiceInterface service) {
        this.service = service;
    }

    @RequestMapping(value="/")
    public ApiStatusResponseDto getApiStatus() {
        return new ApiStatusResponseDto("API em funcionamento");
    }

    @GetMapping("/cep/{cep}")
    @ResponseBody
    public AddressResponseDto getAddressByCep(@PathVariable("cep") String cep) throws IOException, InterruptedException {
        AddressEntity address = this.service.findAddressByCep(cep);

        if (address == null) {
            return new AddressResponseDto(null);
        }

        return new AddressResponseDto(address);
    }

}
