package com.tads.br.commons.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.CONFLICT)
public class UserWithEmailAlreadyExistsException extends Exception {

    public UserWithEmailAlreadyExistsException(String email){
        super("Usuário com email `" + email + "` já existe");
    }

}
