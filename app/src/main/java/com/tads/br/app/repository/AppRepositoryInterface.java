package com.tads.br.app.repository;

import com.tads.br.app.entity.AddressEntity;

import java.io.IOException;

public interface AppRepositoryInterface {

    AddressEntity findAddressByCep(String cep) throws IOException, InterruptedException;

}
