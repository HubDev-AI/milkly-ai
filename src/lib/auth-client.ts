import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
  plugins: [emailOTPClient()],
});

export const {
  useSession,
  signIn,
  signOut,
  signUp,
} = authClient;

// Helper to check if user is authenticated
export function useAuth() {
  const session = useSession();

  return {
    user: session.data?.user ?? null,
    session: session.data?.session ?? null,
    isLoading: session.isPending,
    isAuthenticated: !!session.data?.user,
    refetch: session.refetch,
  };
}
