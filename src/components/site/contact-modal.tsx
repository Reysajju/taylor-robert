"use client";

import { useState, useCallback } from "react";
import { Check, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useContactModal } from "@/lib/contact-store";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "General Inquiry",
  "Press & Media Inquiry",
  "Speaking Request",
  "Rights & Permissions",
] as const;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function showToast(message: string) {
  const existing = document.getElementById("noir-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "noir-toast";
  toast.className =
    "fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 max-w-md border border-gold/30 bg-charcoal-deep px-5 py-3.5 font-mono-dossier text-[0.65rem] tracking-label-sm text-paper shadow-[0_8px_32px_rgba(0,0,0,0.5)]";
  toast.style.cssText =
    "animation: toast-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards;";
  toast.textContent = message;
  document.body.appendChild(toast);

  if (!document.getElementById("toast-keyframes")) {
    const style = document.createElement("style");
    style.id = "toast-keyframes";
    style.textContent = `
      @keyframes toast-in {
        0% { opacity: 0; transform: translateX(-50%) translateY(12px); }
        100% { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes toast-out {
        0% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(12px); }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    toast.style.animation =
      "toast-out 0.35s cubic-bezier(0.22,1,0.36,1) forwards";
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

export function ContactModal() {
  const { open, setOpen } = useContactModal();
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setStatus("idle");
    setErrorMsg("");
  }, []);

  const handleClose = useCallback(
    (val: boolean) => {
      setOpen(val);
      if (!val) {
        setTimeout(resetForm, 200);
      }
    },
    [setOpen, resetForm],
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        showToast(
          "Your inquiry has been submitted. We'll respond within 24-48 hours.",
        );
      } else {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const inputClass =
    "h-12 w-full bg-charcoal border border-paper/15 px-4 font-mono-dossier text-sm text-paper placeholder:text-paper-mute/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="rounded-none border-paper/10 bg-charcoal-deep p-0 shadow-[0_16px_64px_rgba(0,0,0,0.6)] [&>button]:hidden sm:max-w-lg"
        overlayClassName="bg-black/80 backdrop-blur-xl"
      >
        {/* Custom close button — top-right corner */}
        <DialogClose className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center border-b border-l border-paper/10 text-paper/60 transition-colors duration-300 hover:border-gold/30 hover:text-paper">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="max-h-[85vh] overflow-y-auto p-7 sm:p-8">
          <DialogTitle className="sr-only">Submit Inquiry</DialogTitle>
          <DialogDescription className="sr-only">
            Contact form for interviews, review copies, or event bookings.
          </DialogDescription>

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
              SUBMIT INQUIRY
            </h2>
            <p className="mt-2 font-body text-sm text-paper-mute">
              For interviews, review copies, or event bookings.
            </p>
            <div className="mt-4 rule-gold" />
          </div>

          {/* Success state */}
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center border border-gold/30">
                <Check className="h-7 w-7 text-gold" />
              </div>
              <p className="mt-5 font-mono-dossier text-[0.65rem] tracking-label text-gold">
                INQUIRY SUBMITTED
              </p>
              <p className="mt-3 max-w-xs font-body text-sm text-paper-mute/60">
                We&apos;ll review your message and respond within 24-48 hours.
              </p>
              <button
                onClick={() => handleClose(false)}
                className="mt-6 font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/40 transition-colors hover:text-paper"
              >
                CLOSE
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50"
                >
                  NAME
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50"
                >
                  EMAIL
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={inputClass}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50"
                >
                  SUBJECT
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className={cn(
                    inputClass,
                    "appearance-none cursor-pointer bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23b8b1a1%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10",
                  )}
                >
                  <option
                    value=""
                    disabled
                    className="bg-charcoal-deep text-paper-mute"
                  >
                    Select a subject
                  </option>
                  {SUBJECTS.map((s) => (
                    <option
                      key={s}
                      value={s}
                      className="bg-charcoal-deep text-paper"
                    >
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50"
                >
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message…"
                  className={cn(
                    inputClass,
                    "h-auto min-h-[6rem] resize-none border-paper/15 py-3",
                  )}
                />
              </div>

              {/* Error message */}
              {status === "error" && errorMsg && (
                <p role="alert" className="font-mono-dossier text-sm text-rust-bright">
                  {errorMsg}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex h-12 w-full items-center justify-center gap-2 bg-rust font-mono-dossier text-[0.7rem] tracking-label text-paper transition-colors duration-300 hover:bg-rust-bright disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    SUBMITTING…
                  </>
                ) : (
                  "SUBMIT INQUIRY"
                )}
              </button>

              {/* Confidential note */}
              <p className="pt-1 text-center font-mono-dossier text-[0.45rem] tracking-label text-paper-mute/30">
                All communications are confidential.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Trigger link component — use anywhere to open the contact modal */
export function ContactTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setOpen } = useContactModal();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </button>
  );
}