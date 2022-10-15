package com.encodePassword.seeder;

import com.encodePassword.entity.User;
import com.encodePassword.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeed implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    protected UserRepository userRepository;

    public void createUser() {
        if(this.userRepository.count() <= 0) {
            BCryptPasswordEncoder password = new BCryptPasswordEncoder();

            User user = new User();
            user.setId(1L);
            user.setLogin("teste");
            user.setPassword(password.encode("teste"));

            this.userRepository.save(user);
        }
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        this.createUser();
    }
}
