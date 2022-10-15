package com.encodePassword.security;

import com.encodePassword.entity.User;
import com.encodePassword.repository.UserRepository;
import com.encodePassword.service.TokenService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenFilter extends OncePerRequestFilter {

    private String requestHeader = "Authorization";
    private String AuthenticationType = "Bearer ";
    private TokenService tokenService;
    private UserRepository userRepository;

    public TokenFilter(TokenService tokenService, UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods","*");
        response.setHeader("Access-Control-Allow-Headers","*");
        String token = getToken(request);
        boolean valid = tokenService.isTokenValid(token);
        if (valid) {
            authUser(token);
        }
        filterChain.doFilter(request, response);
    }

    private void authUser(String token) {
        User user = userRepository.findById(tokenService.getIdUser(token)).get();
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String getToken(HttpServletRequest request) {
        String token = request.getHeader(requestHeader);
        if(token == null || token.isEmpty() || !token.startsWith(AuthenticationType)){
            return null;
        }
        return token.substring(7, token.length());
    }
}
