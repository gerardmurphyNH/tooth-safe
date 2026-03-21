"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/lib/leads";
import { trackSignupSuccess, trackFormStart, trackFormError } from "@/lib/analytics";

interface EmailFormProps {
  placeholder?: string;
  buttonText?: string;
  /** If true, redirects to /confirmed on success. If false, shows inline success message. */
  redirect?: boolean;
  showFirstName?: boolean;
  className?: string;
}

export default function EmailForm({
  placeholder = "Enter your email",
  buttonText = "Notify Me",
  redirect = true,
  showFirstName = false,
  className = "",
}: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bot trap
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const router = useRouter();

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  function handleInteraction() {
    if (!hasInteracted) {
      setHasInteracted(true);
      trackFormStart();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: silently succeed for bots
    if (honeypot) {
      setStatus("success");
      return;
    }

    if (!email) {
      setErrorMsg("Please enter your email address.");
      setStatus("error");
      trackFormError("empty_email");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      trackFormError("invalid_email");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const result = await submitLead(email, firstName);

    if (result.success) {
      trackSignupSuccess();
      if (redirect) {
        router.push("/confirmed");
      } else {
        setStatus("success");
      }
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-gold font-serif italic text-lg">
        ✦ You&apos;re on the list. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`} noValidate>
      <div className="flex flex-col gap-3 w-full">
        {showFirstName && (
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={handleInteraction}
            placeholder="First name (optional)"
            autoComplete="given-name"
            className="
              w-full px-5 py-3 rounded-lg
              bg-white/10 border border-white/20
              text-cream placeholder-cream-muted
              focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
              transition-colors duration-200
            "
          />
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            onFocus={handleInteraction}
            placeholder={placeholder}
            required
            autoComplete="email"
            disabled={status === "loading"}
            aria-label="Email address"
            className="
              flex-1 px-5 py-3 rounded-lg
              bg-white/10 border border-white/20
              text-cream placeholder-cream-muted
              focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
              transition-colors duration-200
              disabled:opacity-50
            "
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="
              px-7 py-3 rounded-lg font-semibold text-deep-blue
              bg-gold hover:bg-gold-light
              transition-colors duration-200
              whitespace-nowrap
              disabled:opacity-60 disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {status === "loading" ? "Sending…" : buttonText}
          </button>
        </div>
      </div>

      {/* Honeypot — hidden from users, visible to bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
      />

      {status === "error" && errorMsg && (
        <p className="mt-2 text-sm text-red-400">{errorMsg}</p>
      )}
    </form>
  );
}
