"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { supabase } from "../../lib/supabaseClient";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

type FormValues = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  projectTitle?: string;
  service?: string;
  projectNotes?: string;
  startDate?: string;
  endDate?: string;
  preferredConsultation?: string;
  agree: boolean;
};

export default function BookingPage() {
  const methods = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      projectTitle: "",
      service: "",
      projectNotes: "",
      agree: false,
    },
    mode: "onTouched",
  });

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  // Use static service categories for public frontend
  useEffect(() => {
    setServices([
      { id: "dialog-adr", name: "Dialog editing & ADR" },
      { id: "sound-design", name: "Sound design & Editing" },
      { id: "mixing-mastering", name: "Mixing & Mastering" },
      { id: "foley", name: "Foley recording" },
      { id: "music-scoring", name: "Music composition & Scoring" },
      { id: "surround-dolby", name: "5.1 Surround & Dolby Atmos" },
    ]);
    setFallbackUsed(true);
  }, []);

  // keep form values in sync with date picker
  useEffect(() => {
    if (range?.from) {
      methods.setValue("startDate", range.from.toISOString().slice(0, 10));
    } else {
      methods.setValue("startDate", "");
    }
    if (range?.to) {
      methods.setValue("endDate", range.to.toISOString().slice(0, 10));
    } else {
      methods.setValue("endDate", "");
    }
  }, [range, methods]);

  const next = async () => {
    const fieldGroups: Array<keyof FormValues> =
      step === 0 ? ["fullName", "email"] : [];
    // react-hook-form expects specific field names; cast here to satisfy TS when passing an array
    const valid = await methods.trigger(
      fieldGroups.length ? (fieldGroups as any) : undefined
    );
    if (!valid) return;
    setStep((s) => Math.min(2, s + 1));
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
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error("Submission failed: " + res.status + " " + text);
      }

      setSuccess(true);
    } catch (e) {
      console.error("Submission error:", e);
      // fallback to HTML form submission
      try {
        const endpoint = "https://formspree.io/f/xldovywv";
        const form = document.createElement("form");
        form.method = "POST";
        form.action = endpoint;
        form.target = "_blank";
        form.style.display = "none";

        Object.entries(data).forEach(([k, v]) => {
          if (v === undefined || v === null) return;
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = k;
          input.value = Array.isArray(v) ? v.join(", ") : String(v);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        setSuccess(true);
      } catch (e2) {
        console.error("Fallback submission failed:", e2);
        alert(
          "Submission failed. Please try again later or contact us directly."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  // success sound (subtle)
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
      o.frequency.value = 660;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      setTimeout(() => {
        try {
          o.stop();
          ctx.close();
        } catch (err) {}
      }, 600);
    } catch (_) {}
  }, [success]);

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-[#111111] rounded-xl shadow-lg p-6 sm:p-8">
        {!success && (
          <div className="mb-4">
            <h2 className="text-lg font-medium text-[#F3F4F6]">
              Reserve your spot
            </h2>
            <p className="text-sm text-[#9CA3AF]">Step {step + 1} of 3</p>
          </div>
        )}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} aria-live="polite">
            <AnimatePresence initial={false} mode="wait">
              {!success ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* STEP 1 - Personal Info */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#F3F4F6]">
                        Personal information
                      </h3>

                      <div>
                        <Label htmlFor="fullName" className="text-[#9CA3AF]">
                          Full name *
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
                        <Label htmlFor="email" className="text-[#9CA3AF]">
                          Email *
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-[#9CA3AF]">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            {...methods.register("phone")}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company" className="text-[#9CA3AF]">
                            Company (optional)
                          </Label>
                          <Input
                            id="company"
                            {...methods.register("company")}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="projectTitle"
                          className="text-[#9CA3AF]"
                        >
                          Project title (optional)
                        </Label>
                        <Input
                          id="projectTitle"
                          {...methods.register("projectTitle")}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 - Calendar + Service + Notes */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#F3F4F6]">
                        Schedule & project details
                      </h3>

                      <div>
                        <Label className="text-[#9CA3AF]">
                          Select preferred start and end dates
                        </Label>
                        <div className="mt-2 bg-[#0B0B0B] p-3 rounded border border-[#27272A]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Start date picker */}
                            <div>
                              <div className="text-xs text-[#9CA3AF] mb-2">
                                Start date
                              </div>
                              <div className="rounded bg-transparent">
                                <DayPicker
                                  mode="single"
                                  selected={range?.from}
                                  onSelect={(d) => {
                                    const date = d as Date | undefined;
                                    if (date && range?.to && date > range.to) {
                                      setRange({ from: date });
                                    } else {
                                      setRange({ from: date, to: range?.to });
                                    }
                                  }}
                                  className="rdp text-white"
                                  styles={{
                                    root: { background: "transparent" },
                                    caption: { color: "#F3F4F6" },
                                    head_cell: { color: "#9CA3AF" },
                                    head_row: { borderColor: "#27272A" },
                                    table: { color: "#F3F4F6" },
                                    day: {
                                      color: "#F3F4F6",
                                      background: "transparent",
                                    },
                                    day_outside: { color: "#6B7280" },
                                    day_selected: {
                                      background: "#F97316",
                                      color: "#fff",
                                    },
                                  }}
                                />
                              </div>
                            </div>

                            {/* End date picker */}
                            <div>
                              <div className="text-xs text-[#9CA3AF] mb-2">
                                End date
                              </div>
                              <div className="rounded bg-transparent">
                                <DayPicker
                                  mode="single"
                                  selected={range?.to}
                                  onSelect={(d) => {
                                    const date = d as Date | undefined;
                                    if (
                                      date &&
                                      range?.from &&
                                      date < range.from
                                    ) {
                                      setRange({ from: range.from, to: date });
                                    } else {
                                      setRange({ from: range?.from, to: date });
                                    }
                                  }}
                                  disabled={
                                    range?.from
                                      ? { before: range.from }
                                      : undefined
                                  }
                                  className="rdp text-white"
                                  styles={{
                                    root: { background: "transparent" },
                                    caption: { color: "#F3F4F6" },
                                    head_cell: { color: "#9CA3AF" },
                                    head_row: { borderColor: "#27272A" },
                                    table: { color: "#F3F4F6" },
                                    day: {
                                      color: "#F3F4F6",
                                      background: "transparent",
                                    },
                                    day_outside: { color: "#6B7280" },
                                    day_selected: {
                                      background: "#F97316",
                                      color: "#fff",
                                    },
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {(!range?.from || !range?.to) && (
                          <p className="text-sm text-[#9CA3AF] mt-2">
                            Please choose a start and end date.
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="service" className="text-[#9CA3AF]">
                          Service category *
                        </Label>
                        <select
                          id="service"
                          {...methods.register("service", { required: true })}
                          className="w-full mt-1 px-3 py-2 rounded bg-[#0E0E0E] text-white border border-[#27272A]"
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                        {methods.formState.errors.service && (
                          <p className="text-sm text-rose-500 mt-1">
                            Choose a service.
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="projectNotes"
                          className="text-[#9CA3AF]"
                        >
                          Project description
                        </Label>
                        <textarea
                          id="projectNotes"
                          {...methods.register("projectNotes")}
                          className="w-full mt-1 px-3 py-2 rounded bg-[#0E0E0E] text-white border border-[#27272A]"
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="preferredConsultation"
                          className="text-[#9CA3AF]"
                        >
                          Preferred consultation date & time
                        </Label>
                        <input
                          id="preferredConsultation"
                          type="datetime-local"
                          {...methods.register("preferredConsultation")}
                          className="w-full mt-1 px-3 py-2 rounded bg-[#0E0E0E] text-white border border-[#27272A]"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3 - Terms & Confirmation */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#F3F4F6]">
                        Terms & confirmation
                      </h3>

                      <div className="text-sm text-[#9CA3AF]">
                        <p>
                          Please review our terms before submitting. By
                          confirming you agree to our terms and allow us to
                          contact you about your booking.
                        </p>
                        <p className="mt-2">
                          <a
                            href="/terms"
                            target="_blank"
                            className="text-[#F97316] underline"
                          >
                            View terms & conditions
                          </a>
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="agree"
                          {...methods.register("agree", { required: true })}
                          className="mt-1 accent-[#F97316]"
                        />
                        <label htmlFor="agree" className="text-[#F3F4F6]">
                          I agree to the terms and conditions
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
                      {step < 2 ? (
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
                          {submitting ? "Submitting…" : "Submit booking"}
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
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                        }}
                        aria-hidden
                      >
                        <div className="w-20 h-20 rounded-full bg-[#F97316] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-white"
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
                    <h3 className="text-xl font-semibold text-[#F3F4F6]">
                      Booking received
                    </h3>
                    <p className="text-[#9CA3AF] mt-3">
                      Thanks — we'll review your request and get back to you
                      shortly to confirm details.
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
