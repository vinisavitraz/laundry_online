package com.tads.br.email.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements EmailServiceInterface {

    private final JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }


    @Override
    public void sendEmailNewUser(String mailTo, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("lol.lavanderia.online.2023@gmail.com");
        message.setTo(mailTo);
        message.setSubject("Nova conta - Lavanderia Online");
        message.setText("Sua nova conta foi criada na LOL - Lavanderia Online. Utilize a seguinte senha para acesso: " + password);
        this.emailSender.send(message);
    }
}
