package com.encodePassword.controller;

import com.encodePassword.dto.LoginForm;
import com.encodePassword.dto.Token;
import com.encodePassword.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired

    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody @Valid LoginForm credentials) {
        UsernamePasswordAuthenticationToken loginCredentials =
                new UsernamePasswordAuthenticationToken(credentials.getLogin(), credentials.getPassword());
        try{
            Authentication authentication = authenticationManager.authenticate(loginCredentials);
            String token = tokenService.generateToken(authentication);
            return ResponseEntity.ok(new Token(token, "Bearer"));
        }catch (AuthenticationException e){
            return ResponseEntity.notFound().build();
        }
    }

}
