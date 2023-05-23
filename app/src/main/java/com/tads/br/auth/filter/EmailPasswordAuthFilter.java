package com.tads.br.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tads.br.auth.dto.request.AuthRequestDto;
import com.tads.br.auth.provider.UserAuthProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class EmailPasswordAuthFilter extends OncePerRequestFilter {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    private final UserAuthProvider provider;

    public EmailPasswordAuthFilter(UserAuthProvider provider) {
        this.provider = provider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!"/auth".equals(request.getServletPath()) || !HttpMethod.POST.matches(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        AuthRequestDto authRequestDto = MAPPER.readValue(request.getInputStream(), AuthRequestDto.class);

        try {
            SecurityContextHolder.getContext().setAuthentication(provider.validateCredentials(authRequestDto));
        } catch (RuntimeException e) {
            SecurityContextHolder.clearContext();
            throw e;
        }

        filterChain.doFilter(request, response);
    }

}
