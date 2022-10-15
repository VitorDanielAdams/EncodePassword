package com.encodePassword.controller;

import com.encodePassword.entity.Password;
import com.encodePassword.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/api/passwords")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping
    public ResponseEntity<?> insert(@RequestBody Password password) {
        try {
            passwordService.insert(password);
            return ResponseEntity.ok().body("Sucesso");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Não foi possivel cadastrar! " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Page<Password>> listAll(Pageable pageable) {
        return ResponseEntity.ok().body(passwordService.listAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return passwordService.findById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody Password password) {
        try {
            passwordService.update(id,password);
            return ResponseEntity.ok().body("Editado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Ocorreu um erro ao editar! " + e.getMessage());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        return passwordService.delete(id);
    }

}
