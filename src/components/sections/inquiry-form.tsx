"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.email("Please enter a valid email address."),
  service: z.string().min(1, "Please choose a service."),
  projectType: z.string().min(1, "Please choose a project type."),
  budget: z.string().min(1, "Please select a budget range."),
  brief: z.string().min(12, "Tell us a little more about your project."),
});

type InquiryValues = z.infer<typeof inquirySchema>;

const fieldClassName =
  "w-full border border-[var(--color-gold-border)] bg-white px-[14px] py-[13px] text-[0.84rem] font-light text-[var(--color-white)] outline-none transition placeholder:text-[rgba(23,32,39,0.35)] focus:border-[var(--color-gold)] focus:bg-[var(--color-surface)]";

const labelClassName =
  "mb-[7px] block text-[0.58rem] uppercase tracking-[0.2em] text-[var(--color-fog)]";

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
      <div className="mb-2 font-display text-[1.4rem] font-light text-[var(--color-white)]">
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
        <label className={labelClassName}>Service Required</label>
          <select className={fieldClassName} defaultValue="" {...register("service")}>
            <option value="" disabled>Select service</option>
            <option>Architectural Design</option>
            <option>Structural Engineering</option>
            <option>MEP Engineering</option>
            <option>Project Supervision</option>
            <option>Authority Approvals</option>
            <option>Sustainability Advisory</option>
            <option>Interior Design & Fit-Out</option>
            <option>Full-Service Consultancy</option>
          </select>
          <p className="mt-2 text-xs text-rose-600">{errors.service?.message}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClassName}>Project Type</label>
          <select className={fieldClassName} defaultValue="" {...register("projectType")}>
            <option value="" disabled>Project type</option>
            <option>Luxury Villa</option>
            <option>Residential Tower</option>
            <option>Commercial Building</option>
            <option>Mixed-Use Development</option>
            <option>Healthcare</option>
            <option>Hospitality</option>
            <option>Renovation / Upgrade</option>
          </select>
          <p className="mt-2 text-xs text-rose-600">{errors.projectType?.message}</p>
        </div>
        <div>
          <label className={labelClassName}>Budget Range</label>
          <select className={fieldClassName} defaultValue="" {...register("budget")}>
            <option value="" disabled>Budget range</option>
            <option>AED 500K – 2M</option>
            <option>AED 2M – 10M</option>
            <option>AED 10M – 50M</option>
            <option>AED 50M+</option>
          </select>
          <p className="mt-2 text-xs text-rose-600">{errors.budget?.message}</p>
        </div>
      </div>

      <div>
        <label className={labelClassName}>Project Brief</label>
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
        className="mt-1 w-full bg-[var(--color-gold)] px-4 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-white)]"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry — It’s Free"}
      </button>
      {status ? <p className="text-sm text-[var(--color-fog)]">{status}</p> : null}
    </form>
  );
}
