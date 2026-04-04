package com.urlshortener.shortify.controller;

import com.urlshortener.shortify.dto.MessageResponse;
import com.urlshortener.shortify.dto.UrlRequest;
import com.urlshortener.shortify.dto.UrlResponse;
import com.urlshortener.shortify.entity.Url;
import com.urlshortener.shortify.entity.User;
import com.urlshortener.shortify.repository.UrlRepository;
import com.urlshortener.shortify.repository.UserRepository;
import com.urlshortener.shortify.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/url")
public class UrlController {
    @Autowired
    UrlRepository urlRepository;

    @Autowired
    UserRepository userRepository;

    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 6;
    private final SecureRandom random = new SecureRandom();

    private String generateShortCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }

    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(@Valid @RequestBody UrlRequest urlRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String shortCode;
        do {
            shortCode = generateShortCode();
        } while (urlRepository.existsByShortCode(shortCode));

        Url url = new Url();
        url.setOriginalUrl(urlRequest.getUrl());
        url.setShortCode(shortCode);
        url.setUser(user);
        url.setClickCount(0L);

        urlRepository.save(url);

        return ResponseEntity.ok(new UrlResponse(
                url.getId(),
                url.getOriginalUrl(),
                url.getShortCode(),
                url.getClickCount(),
                url.getCreatedAt(),
                user.getName()));
    }

    @GetMapping("/my-urls")
    public ResponseEntity<List<UrlResponse>> getMyUrls() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Url> urls = urlRepository.findByUser(user);
        List<UrlResponse> responses = urls.stream().map(url -> new UrlResponse(
                url.getId(),
                url.getOriginalUrl(),
                url.getShortCode(),
                url.getClickCount(),
                url.getCreatedAt(),
                user.getName())).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUrl(@PathVariable Long id) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Url url = urlRepository.findById(id).orElseThrow(() -> new RuntimeException("URL not found"));

        // Only owner can delete (Admin is handled in AdminController or by checking
        // role here)
        if (!url.getUser().getId().equals(userDetails.getId()) &&
                !userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(403).body(new MessageResponse("Error: Unauthorized to delete this URL"));
        }

        urlRepository.delete(url);
        return ResponseEntity.ok(new MessageResponse("URL deleted successfully"));
    }
}
