import { connectToDatabase } from "./mongodb";
import { compare } from "bcryptjs";

type LoginResult = { success: boolean; data?: any; error?: string };

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("Users").findOne({ email });
    console.log("[AUTH DEBUG] MongoDB user fetch:", user);
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }
    // If passwords are hashed, use bcryptjs compare
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return { success: false, error: "Invalid email or password" };
    }
    // Remove password from returned data
    const { password: _pw, ...userData } = user;
    return { success: true, data: userData };
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) };
  }
}

export async function logout(): Promise<{ success: boolean; error?: string }> {
  // For stateless JWT or sessionless API, just return success
  return { success: true };
}

export default { login, logout };
