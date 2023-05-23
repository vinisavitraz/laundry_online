package com.tads.br.auth.config;

import com.tads.br.auth.filter.EmailPasswordAuthFilter;
import com.tads.br.auth.filter.JWTAuthFilter;
import com.tads.br.auth.provider.UserAuthProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserAuthEntryPoint userAuthEntryPoint;
    private final UserAuthProvider userAuthProvider;

    public SecurityConfig(UserAuthEntryPoint userAuthEntryPoint, UserAuthProvider userAuthProvider) {
        this.userAuthEntryPoint = userAuthEntryPoint;
        this.userAuthProvider = userAuthProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .exceptionHandling().authenticationEntryPoint(userAuthEntryPoint)
                .and()
                .addFilterBefore(new EmailPasswordAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
                .addFilterBefore(new JWTAuthFilter(userAuthProvider), UsernamePasswordAuthenticationFilter.class)
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(HttpMethod.POST, "/auth", "/register", "/cep").permitAll()
                        .anyRequest().authenticated()

                )
                .build();
    }
}
