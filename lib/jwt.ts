// lib/jwt.ts

// Store JWT in a secure cookie
export function setJwtCookie(token: string) {
  if (typeof window === 'undefined') return;
  document.cookie = `admin_jwt=${token}; path=/; secure; samesite=strict`;
}

// Get JWT from cookie
export function getJwtCookie(): string | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )admin_jwt=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// Remove JWT cookie
export function removeJwtCookie() {
  if (typeof window === 'undefined') return;
  document.cookie = 'admin_jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
