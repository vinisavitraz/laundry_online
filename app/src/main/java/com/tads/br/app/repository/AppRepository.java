package com.tads.br.app.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tads.br.app.dto.response.ViaCepResponseDto;
import com.tads.br.app.entity.AddressEntity;
import org.springframework.stereotype.Repository;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Repository
public class AppRepository implements AppRepositoryInterface {

    public static final String VIA_CEP_URI = "http://viacep.com.br/ws/";
    public static final String JSON_RESPONSE = "/json/";
    public static final String ERROR_RESPONSE_BODY = "\"erro\": true";

    @Override
    public AddressEntity findAddressByCep(String cep) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(AppRepository.VIA_CEP_URI + cep + AppRepository.JSON_RESPONSE))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());
        String responseJson = response.body();

        if (responseJson.contains(AppRepository.ERROR_RESPONSE_BODY)) {
            return null;
        }

        ObjectMapper objectMapper = new ObjectMapper();
        ViaCepResponseDto viaCepResponseDto = objectMapper.readValue(responseJson, ViaCepResponseDto.class);

        return AddressEntity.fromProvider(viaCepResponseDto);
    }

}
