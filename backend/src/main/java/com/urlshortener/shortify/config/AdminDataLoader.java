package com.urlshortener.shortify.config;

import com.urlshortener.shortify.entity.User;
import com.urlshortener.shortify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataLoader implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@shortify.com")) {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@shortify.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
            System.out.println("Admin user created: admin@shortify.com / admin123");
        }
    }
}
