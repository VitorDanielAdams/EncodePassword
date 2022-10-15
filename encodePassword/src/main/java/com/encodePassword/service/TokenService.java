package com.encodePassword.service;

import com.encodePassword.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenService {

    @Value("${passwordEncode.jwt.expiration}")
    private String expirationDate;

    @Value("${passwordEncode.jwt.secret}")
    private String secret;

    public String generateToken(Authentication authentication) {
        User user = (User)authentication.getPrincipal();
        Date validFrom = new Date();
        Date validUntil = new Date(validFrom.getTime() + Long.parseLong(expirationDate));
        return Jwts.builder()
                .setIssuer("Encode Password API")
                .setSubject(user.getId().toString())
                .setIssuedAt(validFrom)
                .setExpiration(validUntil)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Long getIdUser(String token) {
        Claims claim =  Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();
        return Long.parseLong(claim.getSubject());
    }
}
