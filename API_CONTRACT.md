# ExoQuest Landing Page — API Integration Contract

This document details the backend endpoints consumed by **ExoQuest-LandingPage** (`http://localhost:3000`) from **ExoQuest-Backend** (`http://localhost:5000`).

---

## 1. Connection & Protocol Overview

* **Backend Base URL**: `http://localhost:5000/api` (Configured via `NEXT_PUBLIC_API_URL`)
* **Transport**: HTTP (Local Dev) / HTTPS (Production)
* **Auth Mode**: Optional / Public with silent rehydration via `refresh-token`

---

## 2. API Endpoints Consumed

### 2.1 Public Platform Status & Metrics

| Method | Endpoint | Description | Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/stats` | Platform counters for landing page stats counter | *None* | `{ "users": number, "challenges": number, "countries": number }` |
| `GET` | `/features` | Feature flags and module statuses | *None* | `{ "features": { "writeups": boolean, "competitions": boolean, "challenges": boolean, "teams": boolean, "chat": boolean, "maintenance": boolean } }` |
| `GET` | `/maintenance/status`| Maintenance banner check | *None* | `{ "enabled": boolean, "message": string, "estimatedEndTime": string | null }` |

### 2.2 Navigation Bar Rehydration

| Method | Endpoint | Description | Auth Required | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/refresh-token` | Silent check if operator is already logged in on any ExoQuest port | Cookie | `{ "token": string, "user": UserObject }` |
| `GET` | `/profile` | Retrieves mini-profile for user dropdown in header | `BearerAuth` / Cookie | `{ "user": UserObject }` |
| `POST` | `/auth/logout` | Global sign-out from navbar | Public / Cookie | `{ "message": string }` |

