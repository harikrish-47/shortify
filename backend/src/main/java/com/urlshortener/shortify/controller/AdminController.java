package com.urlshortener.shortify.controller;

import com.urlshortener.shortify.dto.MessageResponse;
import com.urlshortener.shortify.dto.UrlResponse;
import com.urlshortener.shortify.entity.Url;
import com.urlshortener.shortify.entity.User;
import com.urlshortener.shortify.repository.UrlRepository;
import com.urlshortener.shortify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UrlRepository urlRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/urls")
    public ResponseEntity<List<UrlResponse>> getAllUrls() {
        List<Url> urls = urlRepository.findAll();
        List<UrlResponse> responses = urls.stream().map(url -> new UrlResponse(
                url.getId(),
                url.getOriginalUrl(),
                url.getShortCode(),
                url.getClickCount(),
                url.getCreatedAt(),
                url.getUser() != null ? url.getUser().getName() : "Anonymous" // Fixed null pointer? Actually shortener
                                                                              // requires user based on my
                                                                              // entity/controller logic
        )).collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalUrls", urlRepository.count());
        stats.put("totalClicks", urlRepository.findAll().stream().mapToLong(Url::getClickCount).sum());
        return ResponseEntity.ok(stats);
    }

    @DeleteMapping("/url/{id}")
    public ResponseEntity<?> deleteAnyUrl(@PathVariable Long id) {
        if (!urlRepository.existsById(id)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: URL not found"));
        }
        urlRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("URL deleted by admin"));
    }
}
