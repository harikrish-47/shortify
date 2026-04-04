package com.urlshortener.shortify.controller;

import com.urlshortener.shortify.entity.Url;
import com.urlshortener.shortify.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Optional;

@RestController
public class RedirectController {
    @Autowired
    UrlRepository urlRepository;

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> redirectToOriginal(@PathVariable String shortCode) {
        Optional<Url> urlOptional = urlRepository.findByShortCode(shortCode);
        if (urlOptional.isPresent()) {
            Url url = urlOptional.get();
            url.setClickCount(url.getClickCount() + 1);
            urlRepository.save(url);

            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create(url.getOriginalUrl()));
            return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("URL Not Found");
        }
    }
}
