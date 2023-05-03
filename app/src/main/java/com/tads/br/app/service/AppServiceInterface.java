package com.tads.br.app.service;

import com.tads.br.app.entity.AddressEntity;

import java.io.IOException;

public interface AppServiceInterface {

    AddressEntity findAddressByCep(String cep) throws IOException, InterruptedException;

}
