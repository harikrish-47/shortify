package com.urlshortener.shortify.repository;

import com.urlshortener.shortify.entity.Url;
import com.urlshortener.shortify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
    Optional<Url> findByShortCode(String shortCode);

    List<Url> findByUser(User user);

    Boolean existsByShortCode(String shortCode);
}
