import { useState } from "react";
import { authClient } from "../lib/auth-client";

type Step = "email" | "otp";

export default function Login() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });

      if (sendError) {
        throw new Error(sendError.message || "Failed to send verification code");
      }

      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: verifyError } = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      if (verifyError) {
        throw new Error(verifyError.message || "Invalid verification code");
      }

      // Auth state will update automatically via useAuth hook
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Sign in to generate newsletters
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Use your Milkly account to get started
      </p>

      {step === "email" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus-glow transition-all"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="btn-espresso w-full py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Continue with Email"}
          </button>

          <p className="text-xs text-muted-foreground">
            We'll send you a one-time code to verify your email
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Enter the 6-digit code sent to <span className="text-foreground">{email}</span>
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-center text-2xl tracking-widest placeholder:text-muted-foreground focus:outline-none focus-glow transition-all"
              disabled={isLoading}
              autoFocus
              maxLength={6}
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="btn-espresso w-full py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>

          <button
            type="button"
            onClick={() => {
              setStep("email");
              setOtp("");
              setError(null);
            }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Use a different email
          </button>
        </form>
      )}
    </div>
  );
}
