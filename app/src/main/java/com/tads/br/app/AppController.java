package com.tads.br.app;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    @CrossOrigin
    @RequestMapping(value="/")
    public static String Welcome() {
        System.out.println("dsads");
        return "Welcome to Spring Boot \n" +
                "Remember to subscribe and leave a comment";
    }
}
