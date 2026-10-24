const isProd = process.env.NODE_ENV === "production";

export const PRACTICES_URL = (
  process.env.NEXT_PUBLIC_PRACTICES_URL ||
  (isProd ? "https://practices.exoquest.dev" : "http://localhost:3001")
).replace(/\/$/, "");

export const COMPETITIONS_URL = (
  process.env.NEXT_PUBLIC_COMPETITIONS_URL ||
  (isProd ? "https://competitions.exoquest.dev" : "http://localhost:3002")
).replace(/\/$/, "");

export const WRITEUPS_URL = (
  process.env.NEXT_PUBLIC_WRITEUP_URL ||
  process.env.NEXT_PUBLIC_WRITEUPS_URL ||
  (isProd ? "https://writeups.exoquest.dev" : "http://localhost:3003")
).replace(/\/$/, "");

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (isProd ? "https://api.exoquest.dev" : "http://localhost:5000")
).replace(/\/$/, "").replace(/\/api$/, "");

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (isProd ? "https://exoquest.dev" : "http://localhost:3000")
).replace(/\/$/, "");

export const ACCOUNTS_URL = (
  process.env.NEXT_PUBLIC_ACCOUNTS_URL ||
  (isProd ? "https://accounts.exoquest.dev" : "http://localhost:3005")
).replace(/\/$/, "");

export const ADMIN_URL = (
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  (isProd ? "https://admin.exoquest.dev" : "http://localhost:3004")
).replace(/\/$/, "");

