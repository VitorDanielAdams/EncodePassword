package com.encodePassword.dto;

public class Token {
    public String token;
    public String type;

    public Token(String token, String type) {
        this.token = token; this.type = type;
    }
}
