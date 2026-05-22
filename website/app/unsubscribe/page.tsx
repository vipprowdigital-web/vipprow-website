"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MailX, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUnsubscribe = async () => {
    try {
      setLoading(true);
      setError("");

      if (!email.trim()) {
        setError("Please enter your email address");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/newsletter/unsubscribe`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-6 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Floating Elements */}
      <div className="floating-element top-20 left-20" />
      <div className="floating-element top-40 right-32" />
      <div className="floating-element bottom-32 left-1/3" />
      <div className="floating-element bottom-24 right-24" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,255,255,0.06)]">
          {/* Glow */}
          <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 p-8 md:p-12">
            {!success ? (
              <>
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl">
                  <MailX className="h-10 w-10 text-white" />
                </div>

                {/* Heading */}
                <h1 className="text-center text-xl md:text-3xl font-bold font-heading text-white">
                  Unsubscribe Newsletter
                </h1>

                <p className="mt-4 text-center text-sm md:text-base leading-relaxed text-white/70">
                  Enter your email address below to confirm your unsubscription
                  from our newsletters and article updates.
                </p>

                {/* Input */}
                <div className="mt-10">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-3 w-full rounded-2xl border border-white/10 bg-gray/5 pl-12 pr-4 text-white placeholder:text-white/40 backdrop-blur-xl outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/10"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Button */}
                  <button
                    onClick={handleUnsubscribe}
                    disabled={loading}
                    className="group relative mt-6 w-full text-sm md:text-md overflow-hidden rounded-2xl bg-linear-to-r from-blue-700 via-blue-900 to-black py-3 font-medium text-white transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 border border-blue-800"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <MailX className="h-5 w-5" />
                          Confirm Unsubscribe
                        </>
                      )}
                    </span>

                    {/* <div className="absolute inset-0 bg-linear-to-r from-white via-gray-200 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100" /> */}
                  </button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-400/20 bg-green-400/10">
                  <CheckCircle2 className="h-10 w-10 text-green-400" />
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Successfully Unsubscribed
                </h2>

                <p className="mt-4 leading-relaxed text-white/70">
                  Your email has been removed from our newsletter mailing list.
                </p>

                <Link
                  href="/"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
                >
                  Back to Home
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
