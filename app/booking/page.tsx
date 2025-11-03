"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type FormValues = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;

  projectTitle?: string;
  services?: string[];
  projectType?: string;
  projectDuration?: string;
  preferredDeadline?: string;
  projectNotes?: string;

  preferredStart?: string;
  timeZone?: string;

  agree: boolean;
};

const servicesList = [
  "Dialogue Editing",
  "Sound Effects Editing",
  "ADR",
  "Foley",
  "Music Composition",
  "Sound Mixing",
  "Mastering",
  "5.1 Surround Sound Mixing",
];

const projectTypes = ["Film", "Commercial", "Podcast", "Game", "Other"];

export default function BookingPage() {
  const methods = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      services: [],
      agree: false,
    },
    mode: "onTouched",
  });

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const next = async () => {
    const valid = await methods.trigger();
    if (!valid) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data: FormValues) => {
    if (!data.agree) {
      methods.setError("agree", {
        type: "required",
        message: "You must agree to continue",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Post to Formspree (preferred method). Use Accept: application/json to get a JSON response.
      const payload = new URLSearchParams();
      Object.entries(data).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        if (Array.isArray(v)) payload.append(k, v.join(", "));
        else payload.append(k, String(v));
      });

      const endpoint = "https://formspree.io/f/xldovywv";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: payload.toString(),
        mode: "cors",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error("Submission failed: " + res.status + " " + text);
      }

      setSuccess(true);
    } catch (e) {
      // Network/CORS/extensions can cause fetch to fail. Try a graceful fallback that submits via a
      // plain HTML form (this avoids CORS preflight and many extension blocks).
      // Log errors more robustly: if the caught value is an Event (e.g. network/ProgressEvent)
      // print its type and avoid printing as "[object Event]".
      if (e instanceof Event) {
        console.error("Formspree fetch failed: event", e.type, e);
      } else if (e && typeof e === "object") {
        // Common Error objects have message
        // eslint-disable-next-line no-console
        console.error("Formspree fetch failed:", (e as any).message ?? e, e);
      } else {
        // primitive
        console.error("Formspree fetch failed:", e);
      }

      try {
        const endpoint = "https://formspree.io/f/xldovywv";
        const form = document.createElement("form");
        form.method = "POST";
        form.action = endpoint;
        // Open fallback in a new tab so user doesn't lose the current state if browser blocks navigation
        form.target = "_blank";
        form.style.display = "none";

        Object.entries(data).forEach(([k, v]) => {
          if (v === undefined || v === null) return;
          if (Array.isArray(v)) {
            v.forEach((item) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = k;
              input.value = String(item);
              form.appendChild(input);
            });
          } else {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = k;
            input.value = String(v);
            form.appendChild(input);
          }
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        // Inform the user that a fallback was attempted.
        alert(
          "If a new tab opened, your booking was submitted via a fallback method. If nothing opened, please disable browser extensions that block outgoing requests (adblock/privacy) and try again."
        );
        setSuccess(true);
      } catch (e2) {
        if (e2 instanceof Event) {
          console.error("Fallback form submission failed: event", e2.type, e2);
        } else if (e2 && typeof e2 === "object") {
          console.error(
            "Fallback form submission failed:",
            (e2 as any).message ?? e2,
            e2
          );
        } else {
          console.error("Fallback form submission failed:", e2);
        }
        alert(
          "There was an error submitting your booking. Please try again later or contact us directly via email."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Play a short success beep when the booking completes. Browser may block audio unless user interacted;
  // this runs after the user submits the form (so usually allowed).
  useEffect(() => {
    if (!success) return;
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      setTimeout(() => {
        try {
          o.stop();
          ctx.close();
        } catch (err) {
          // ignore
        }
      }, 400);
    } catch (err) {
      // Fail silently if audio can't play; log with context
      if (err instanceof Event) {
        console.warn("Audio playback failed: event", err.type, err);
      } else if (err && typeof err === "object") {
        console.warn(
          "Audio playback failed:",
          (err as any).message ?? err,
          err
        );
      } else {
        console.warn("Audio playback failed:", err);
      }
    }
  }, [success]);

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-3xl bg-[#111111] rounded-xl shadow-lg p-8">
        {!success && (
          <>
            <h2 className="text-lg font-medium text-gray-300 mb-1">
              Reserve your spot
            </h2>
            <p className="text-xs text-gray-500 mb-6">Step {step + 1} of 4</p>
          </>
        )}

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="relative"
            aria-live="polite"
          >
            <AnimatePresence initial={false} mode="wait">
              {!success ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* STEP 1: Client Information */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        Step 1: Client Information
                      </h3>

                      <div>
                        <Label htmlFor="fullName" className="text-gray-200">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          {...methods.register("fullName", {
                            required: "Full name is required",
                          })}
                          className="mt-1"
                        />
                        {methods.formState.errors.fullName && (
                          <p className="text-sm text-rose-500 mt-1">
                            {methods.formState.errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-200">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...methods.register("email", {
                            required: "Email is required",
                          })}
                          className="mt-1"
                        />
                        {methods.formState.errors.email && (
                          <p className="text-sm text-rose-500 mt-1">
                            {methods.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-200">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          {...methods.register("phone")}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-gray-200">
                          Company / Studio
                        </Label>
                        <Input
                          id="company"
                          {...methods.register("company")}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Project Details */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        Step 2: Project Details
                      </h3>

                      <div>
                        <Label htmlFor="projectTitle" className="text-gray-200">
                          Project Title / Name
                        </Label>
                        <Input
                          id="projectTitle"
                          {...methods.register("projectTitle")}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-200">
                          Service(s) Needed *
                        </Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {servicesList.map((s) => (
                            <label
                              key={s}
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                value={s}
                                {...methods.register("services", {
                                  required: true,
                                })}
                                className="accent-[#F97316]"
                              />
                              <span className="text-gray-300">{s}</span>
                            </label>
                          ))}
                        </div>
                        {methods.formState.errors.services && (
                          <p className="text-sm text-rose-500 mt-1">
                            Please select at least one service.
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="projectType" className="text-gray-200">
                          Project Type
                        </Label>
                        <select
                          id="projectType"
                          {...methods.register("projectType")}
                          className="w-full mt-1 px-3 py-2 rounded bg-[#0E0E0E] text-white border border-[#27272A]"
                        >
                          <option value="">Select</option>
                          {projectTypes.map((pt) => (
                            <option key={pt} value={pt}>
                              {pt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label
                          htmlFor="projectDuration"
                          className="text-gray-200"
                        >
                          Project Duration
                        </Label>
                        <Input
                          id="projectDuration"
                          {...methods.register("projectDuration")}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="preferredDeadline"
                          className="text-gray-200"
                        >
                          Preferred Deadline
                        </Label>
                        <Input
                          id="preferredDeadline"
                          type="date"
                          {...methods.register("preferredDeadline")}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="projectNotes" className="text-gray-200">
                          Project Description / Notes
                        </Label>
                        <textarea
                          id="projectNotes"
                          {...methods.register("projectNotes")}
                          className="w-full mt-1 px-3 py-2 rounded bg-[#0E0E0E] text-white border border-[#27272A]"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Booking Preferences */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        Step 3: Booking Preferences
                      </h3>

                      <div>
                        <Label
                          htmlFor="preferredStart"
                          className="text-gray-200"
                        >
                          Preferred Start Date / Session Date
                        </Label>
                        <Input
                          id="preferredStart"
                          type="date"
                          {...methods.register("preferredStart")}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="timeZone" className="text-gray-200">
                          Time Zone
                        </Label>
                        <select
                          id="timeZone"
                          {...methods.register("timeZone")}
                          className="w-full mt-1 px-3 py-2 rounded bg-[#0E0E0E] text-white border border-[#27272A]"
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">
                            America/New_York
                          </option>
                          <option value="Europe/London">Europe/London</option>
                          <option value="Africa/Kigali">Africa/Kigali</option>
                          <option value="Asia/Tokyo">Asia/Tokyo</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Final */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        Final Step
                      </h3>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="agree"
                          {...methods.register("agree", { required: true })}
                          className="mt-1 accent-[#F97316]"
                        />
                        <label htmlFor="agree" className="text-gray-300">
                          I agree to the terms and conditions.
                        </label>
                      </div>
                      {methods.formState.errors.agree && (
                        <p className="text-sm text-rose-500">
                          You must agree before submitting.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      {step > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={back}
                          className="mr-2"
                        >
                          Back
                        </Button>
                      )}
                    </div>

                    <div>
                      {step < 3 ? (
                        <Button
                          type="button"
                          onClick={next}
                          className="bg-[#F97316] text-white"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-[#F97316] text-white"
                          disabled={submitting}
                        >
                          {submitting ? "Booking…" : "Book My Session"}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center py-10">
                    <div className="flex items-center justify-center mb-4">
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: [1.05, 0.95, 1], opacity: 1 }}
                        transition={{
                          duration: 0.7,
                          times: [0, 0.6, 1],
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                        }}
                        aria-hidden="true"
                      >
                        <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      Booking received successfully!
                    </h3>
                    <p className="text-gray-300 mt-3">
                      Thank you for choosing us. Our team will review your
                      details and get back to you shortly to confirm your
                      session and discuss the next steps.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
