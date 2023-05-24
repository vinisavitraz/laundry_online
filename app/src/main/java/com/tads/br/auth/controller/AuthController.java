package com.tads.br.auth.controller;

import com.tads.br.auth.dto.response.AuthResponseDto;
import com.tads.br.auth.provider.UserAuthProvider;
import com.tads.br.user.entity.UserEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    private final UserAuthProvider userAuthProvider;

    public AuthController(UserAuthProvider userAuthProvider) {
        this.userAuthProvider = userAuthProvider;
    }

    @PostMapping("/auth")
    @ResponseBody
    public AuthResponseDto authUser(@AuthenticationPrincipal UserEntity user) {
        AuthResponseDto response = new AuthResponseDto();
        response.setToken(this.userAuthProvider.createToken(user.getEmail()));

        return response;
    }
//    private final AppServiceInterface service;
//
//    public AuthController(AppServiceInterface service) {
//        this.service = service;
//    }
//
//    @RequestMapping(value="/")
//    public ApiStatusResponseDto getApiStatus() {
//        return new ApiStatusResponseDto("API em funcionamento");
//    }
//
//    @GetMapping("/cep/{cep}")
//    @ResponseBody
//    public AddressResponseDto getAddressByCep(@PathVariable("cep") String cep) throws IOException, InterruptedException {
//        AddressEntity address = this.service.findAddressByCep(cep);
//
//        if (address == null) {
//            return new AddressResponseDto(null);
//        }
//
//        return new AddressResponseDto(address);
//    }

}
