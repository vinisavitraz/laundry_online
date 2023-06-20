package com.tads.br.commons.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.CONFLICT)
public class UserWithDocumentAlreadyExistsException extends Exception {

    public UserWithDocumentAlreadyExistsException(String document){
        super("Usuário com documento `" + document + "` já existe");
    }

}
