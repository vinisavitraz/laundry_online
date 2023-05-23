package com.tads.br.auth.provider;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.tads.br.auth.dto.request.AuthRequestDto;
import com.tads.br.auth.service.AuthService;
import com.tads.br.user.entity.UserEntity;
import com.tads.br.user.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Component
public class UserAuthProvider {

    private final AuthService authService;
    private final UserService userService;

    @Value("$(security.jwt.token.secret-key:secret-key)")
    private String secretKey;

    public UserAuthProvider(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String email) {
        Date now = new Date();
        Date validDate = new Date(now.getTime() + 3600000);

        return JWT.create()
                .withIssuer(email)
                .withIssuedAt(now)
                .withExpiresAt(validDate)
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);
        String email = decoded.getIssuer();

        UserEntity user = this.userService.findUserByEmail(email);

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

    public Authentication validateCredentials(AuthRequestDto authRequestDto) {
        UserEntity user = this.authService.authenticate(authRequestDto);

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}
