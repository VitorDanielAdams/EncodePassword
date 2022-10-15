package com.encodePassword.service;

import com.encodePassword.entity.Password;
import com.encodePassword.repository.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.Optional;

@Service
public class PasswordService {

    @Autowired
    private PasswordRepository passwordRepository;

    @Transactional
    public void save(Password password) {
        password.setPassword(Base64.getEncoder().encodeToString(password.getPassword().getBytes()));
        passwordRepository.save(password);
    }

    public void insert(Password password) {
        this.save(password);
    }

    public Page<Password> listAll(Pageable pageable) {
        Pageable pageable1 = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.Direction.ASC, "id");
        return passwordRepository.findAll(pageable1);
    }

    public ResponseEntity<?> findById(Long id) {
        Optional<Password> password = passwordRepository.findById(id);
        byte[] decodedBytes = Base64.getDecoder().decode(password.get().getPassword());
        password.get().setPassword(new String(decodedBytes));
        return password.isPresent() ?
                ResponseEntity.ok().body(password.get()) :
                ResponseEntity.badRequest().body("Password não existe");
    }

    public void update(Long id, Password password) {
        if(id == password.getId()){
            this.save(password);
        } else {
            throw new RuntimeException();
        }
    }

    @Transactional
    public ResponseEntity<?> delete(Long id) {
        try {
            passwordRepository.deleteById(id);
            return ResponseEntity.ok().body("Excluído com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
