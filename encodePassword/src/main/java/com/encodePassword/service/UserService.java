package com.encodePassword.service;

import com.encodePassword.entity.User;
import com.encodePassword.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    public void insert(User user) {
        this.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

}
