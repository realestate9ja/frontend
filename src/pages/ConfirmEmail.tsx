import { useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Home, Mail, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [resent, setResent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const email = useMemo(() => {
    const stateEmail = (location.state as { email?: string } | null)?.email;
    return stateEmail ?? searchParams.get("email") ?? "your email";
  }, [location.state, searchParams]);

  const otpValue = otp.join("");

  const handleDigitChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "");
    const next = [...otp];
    next[index] = value ? value[0] : "";
    setOtp(next);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!pasted) return;

    event.preventDefault();
    const next = ["", "", "", "", ""];
    pasted.split("").forEach((digit, index) => {
      next[index] = digit;
    });
    setOtp(next);

    const focusIndex = Math.min(pasted.length, 4);
    inputRefs.current[focusIndex]?.focus();
    inputRefs.current[focusIndex]?.select();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex bg-secondary/30">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-primary/5 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-md">
          <Link to="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Dwello</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Confirm your email<br />
            <span className="text-primary">before setup.</span>
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We use email verification to protect seekers, providers, and landlords before they enter the platform.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Dwello</span>
            </div>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Confirm your email</CardTitle>
            <CardDescription>
              Enter the OTP sent to <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-1.5 text-center">
              <label className="text-sm font-medium text-foreground">One-time password</label>
              <div className="flex items-center justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(node) => {
                      inputRefs.current[index] = node;
                    }}
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    className="h-12 w-12 rounded-xl text-center text-lg font-semibold"
                    value={digit}
                    onChange={(event) => handleDigitChange(index, event.target.value)}
                    onPaste={handlePaste}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Paste the 5-digit code and it will fill automatically.</p>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                className="w-full h-11 rounded-lg font-medium gap-2"
                onClick={() => navigate("/onboarding")}
                disabled={otpValue.length !== 5}
              >
                Verify email <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 rounded-lg font-medium gap-2"
                onClick={() => setResent(true)}
              >
                <RefreshCw className="h-4 w-4" /> Resend verification email
              </Button>
            </div>

            {resent ? (
              <p className="text-center text-xs text-emerald-600">
                A fresh OTP has been sent to {email}.
              </p>
            ) : null}

            <div className="text-center text-sm text-muted-foreground">
              Used the wrong email?{" "}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Go back
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
