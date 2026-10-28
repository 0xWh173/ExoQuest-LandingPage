# ExoQuest Landing Page - Swagger API Endpoints Checklist

> **Swagger UI Reference**: [http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html)  
> **Backend Host**: `http://localhost:5000` | **Landing Page Port**: `3000`

This document details all API endpoints consumed by **ExoQuest-LandingPage** (Public Marketing, Platform Status, Showcase & Navbar Session) that are documented in the Main Backend Swagger specification.

---

## 1. Authentication & Navbar Session (`auth`, `profile`)

| Method | Endpoint | Swagger Route | Status | Notes |
|:------:|:---------|:--------------|:------:|:------|
| `POST` | `/api/auth/refresh-token` | `/auth/refresh-token` | Verified | Silent SSO session check across ports |
| `GET` | `/api/auth/me` | `/auth/me` | Verified | Current user identity for header |
| `POST` | `/api/auth/logout` | `/auth/logout` | Verified | Global logout from landing header |
| `GET` | `/api/profile` | `/profile` | Verified | Mini-profile for avatar & level dropdown |

---

## 2. Public Community & Showcase Endpoints (`challenges`, `rankings`, `misc`)

| Method | Endpoint | Swagger Route | Status | Notes |
|:------:|:---------|:--------------|:------:|:------|
| `GET` | `/api/challenges` | `/challenges` | Verified | Showcase sample challenges on landing page |
| `GET` | `/api/rankings` | `/rankings` | Verified | Top leaderboard preview for social proof |
| `GET` | `/api/cve-of-the-day` | `/cve-of-the-day` | Verified | Curated cybersecurity news ticker |
| `GET` | `/api/achievements` | `/achievements` | Verified | Badge showcase in gamification section |

---

## Verification Summary
- **Landing Page Endpoints**: All mapped and verified against Swagger on `:5000`.
- **Status**: 100% Swagger documented.

