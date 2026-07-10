"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.email("Please enter a valid email address."),
  brief: z.string().optional(),
});

type InquiryValues = z.infer<typeof inquirySchema>;

const fieldClassName =
  "w-full border border-[var(--color-divider)] bg-[var(--color-surface)] px-[14px] py-[13px] text-[0.84rem] font-light text-[var(--color-charcoal)] outline-none transition placeholder:text-[var(--color-cool-gray)] focus:border-[var(--color-steel-blue)] focus:bg-[var(--color-surface)]";

const labelClassName =
  "mb-[7px] block text-[0.58rem] uppercase tracking-[0.2em] text-[var(--color-cool-gray)]";

export function InquiryForm() {
  const [status, setStatus] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (values: InquiryValues) => {
    setStatus(null);
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await response.json()) as { message: string };
    setStatus(data.message);
    if (response.ok) reset();
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 font-display text-[1.4rem] font-light text-[var(--color-charcoal)]">
        Request a Free Consultation
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClassName}>Full Name</label>
          <input className={fieldClassName} placeholder="Full name" autoComplete="name" {...register("name")} />
          <p className="mt-2 text-xs text-rose-600">{errors.name?.message}</p>
        </div>
        <div>
          <label className={labelClassName}>Phone / WhatsApp</label>
          <input className={fieldClassName} placeholder="Phone" autoComplete="tel" inputMode="tel" {...register("phone")} />
          <p className="mt-2 text-xs text-rose-600">{errors.phone?.message}</p>
        </div>
      </div>

      <div>
        <label className={labelClassName}>Email Address</label>
        <input className={fieldClassName} placeholder="your@email.com" autoComplete="email" inputMode="email" {...register("email")} />
        <p className="mt-2 text-xs text-rose-600">{errors.email?.message}</p>
      </div>

      <div>
        <label className={labelClassName}>Project Brief <span className="normal-case tracking-normal text-[var(--color-cool-gray)]">(optional)</span></label>
        <textarea
          className={`${fieldClassName} min-h-36 resize-y`}
          placeholder="Tell us about your project vision, location, timeline..."
          {...register("brief")}
        />
        <p className="mt-2 text-xs text-rose-600">{errors.brief?.message}</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 w-full bg-[var(--color-deep-charcoal)] px-4 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-charcoal)]"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry — It’s Free"}
      </button>
      {status ? <p className="text-sm text-[var(--color-cool-gray)]">{status}</p> : null}
    </form>
  );
}


