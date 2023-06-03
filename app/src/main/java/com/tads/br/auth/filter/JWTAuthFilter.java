package com.tads.br.auth.filter;

import com.tads.br.auth.entity.TokenEntity;
import com.tads.br.auth.provider.UserAuthProvider;
import com.tads.br.auth.service.AuthServiceInterface;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;

public class JWTAuthFilter extends OncePerRequestFilter {

    private final UserAuthProvider userAuthProvider;
    private final AuthServiceInterface authService;

    public JWTAuthFilter(UserAuthProvider userAuthProvider, AuthServiceInterface authService) {
        this.userAuthProvider = userAuthProvider;
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String[] authElements = header.split(" ");

        if (authElements.length != 2 || !"Bearer".equals(authElements[0])) {
            filterChain.doFilter(request, response);
            return;
        }

        String tokenFromRequest = authElements[1];

        try {
            TokenEntity token = this.authService.getToken(tokenFromRequest);

            if (token == null) {
                throw new RuntimeException("Token from request not found");
            }

            if (new Date().after(token.getExpiresAt())) {
                this.authService.deleteToken(token);
                throw new RuntimeException("Token is expired");
            }

            SecurityContextHolder.getContext().setAuthentication(
                    userAuthProvider.validateToken(tokenFromRequest)
            );
        } catch (RuntimeException e) {
            SecurityContextHolder.clearContext();
            throw e;
        }

        filterChain.doFilter(request, response);
    }

}
