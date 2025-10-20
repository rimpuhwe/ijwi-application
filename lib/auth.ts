import supabase from './supabaseClient';

type LoginResult = { success: boolean; data?: any; error?: string };

export async function login(email: string, password: string): Promise<LoginResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) };
  }
}

export async function logout(): Promise<{ success: boolean; error?: string }> {
  try {
    await supabase.auth.signOut();

    if (typeof window !== 'undefined' && window.localStorage) {
      // Remove any supabase-related keys left in localStorage
      try {
        Object.keys(localStorage).forEach((k) => {
          if (k.startsWith('supabase')) localStorage.removeItem(k);
        });
      } catch (e) {
        // ignore
      }
    }

    // Client-side redirect to the login page
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) };
  }
}

export default { login, logout };
