package com.urlshortener.shortify.dto;

import jakarta.validation.constraints.NotBlank;

public class UrlRequest {
    @NotBlank
    private String url;

    public UrlRequest() {
    }

    public UrlRequest(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
