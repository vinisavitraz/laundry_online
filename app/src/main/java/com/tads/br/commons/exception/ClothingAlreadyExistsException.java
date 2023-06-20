package com.tads.br.commons.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.CONFLICT)
public class ClothingAlreadyExistsException extends Exception {

    public ClothingAlreadyExistsException(String name){
        super("Roupa com nome `" + name + "` já existe");
    }

}
