package com.tads.br.app.service;

import com.tads.br.app.entity.AddressEntity;
import com.tads.br.app.repository.AppRepositoryInterface;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AppService implements AppServiceInterface {

    private final AppRepositoryInterface repository;

    public static final int CEP_LENGTH = 8;

    public AppService(AppRepositoryInterface repository) {
        this.repository = repository;
    }

    @Override
    public AddressEntity findAddressByCep(String cep) throws IOException, InterruptedException {
        if (cep.length() != AppService.CEP_LENGTH) {
            return null;
        }
        return this.repository.findAddressByCep(cep);
    }

}
