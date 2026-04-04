# Shortify &ndash; Secure URL Shortener Platform

A modern SaaS application for shortening links with deep analytics, built with Spring Boot and React.

## Features
- **Modern UI**: Blue + Green theme, responsive sidebar + navbar.
- **Secure Auth**: JWT-based stateless authentication with password encryption.
- **Role System**: `USER` (create/view/delete own links), `ADMIN` (manage all users and links).
- **Core Functionality**: Generate unique 6-char short codes, click counting, and high-speed redirection.

## Tech Stack
- **Frontend**: React (Vite), Axios, Lucide Icons, Vanilla CSS
- **Backend**: Spring Boot 3.2, Spring Security, JPA/Hibernate, MySQL, JJWT (JWT)
- **Database**: MySQL 8.0+

## Setup Instructions

### 1. Database Setup
- Ensure MySQL is running.
- Create a database called `shortify_db`.
- Default credentials are: `root` / `root` (can be changed in `backend/src/main/resources/application.properties`).

### 2. Backend (Spring Boot)
1. Open a terminal in `backend/`
2. Run `mvn spring-boot:run`
3. Default admin credentials on first start:
   - Email: `admin@shortify.com`
   - Password: `admin123`

### 3. Frontend (React)
1. Open a terminal in `frontend/`
2. Run `npm install`
3. Run `npm run dev`
4. Access the app at `http://localhost:5173`

## Platform Redirection
The backend handles the redirection from `http://localhost:8080/{shortCode}` to the original long URL.
Make sure the backend is running for links to work!
