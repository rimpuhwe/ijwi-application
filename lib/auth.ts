"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Seeded admin credentials
const ADMIN_EMAIL = "admin@ijwihub.com"
const ADMIN_PASSWORD = "admin123"

const SESSION_COOKIE = "admin_session"

export async function login(email: string, password: string) {
  // Validate credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Create session
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return { success: true }
  }

  return { success: false, error: "Invalid email or password" }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect("/admin/login")
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  return session?.value === "authenticated"
}
