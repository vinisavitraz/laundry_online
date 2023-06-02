package com.tads.br.auth.controller;

import com.tads.br.auth.dto.response.AuthResponseDto;
import com.tads.br.auth.entity.TokenEntity;
import com.tads.br.auth.service.AuthServiceInterface;
import com.tads.br.commons.dto.response.EntityResponseDto;
import com.tads.br.commons.dto.response.StatusResponseDto;
import com.tads.br.user.entity.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    private final AuthServiceInterface service;

    public AuthController(AuthServiceInterface service) {
        this.service = service;
    }

    @PostMapping("/auth")
    @ResponseBody
    public AuthResponseDto authUser(@AuthenticationPrincipal UserEntity user) {
        TokenEntity token = this.service.createToken(user);

        return new AuthResponseDto(token, user.getRole());
    }

    @GetMapping("/authenticated-user")
    @ResponseBody
    public EntityResponseDto<UserEntity> getAuthenticatedUser(@AuthenticationPrincipal UserEntity user) {
        return new EntityResponseDto<>(user);
    }

    @PostMapping("/log-out")
    @ResponseBody
    public StatusResponseDto logoutUser(@AuthenticationPrincipal UserEntity user, HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
            this.service.logoutUser(user);
        }

        return new StatusResponseDto("User is now logged out");
    }

}
