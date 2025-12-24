
import { NextResponse } from "next/server";
import { login } from "@/lib/auth-mongo";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const result = await login(email, password);
  // Debug output for troubleshooting
  console.log("[LOGIN DEBUG] Email:", email);
  if (result && result.data) {
    console.log("[LOGIN DEBUG] User found:", result.data.email);
  } else {
    console.log("[LOGIN DEBUG] User not found or password mismatch");
  }
  if (result.success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json(
    { success: false, error: result.error },
    { status: 401 }
  );
}
