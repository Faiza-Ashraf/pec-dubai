import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.email(),
  service: z.string().min(1),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  brief: z.string().min(12),
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = inquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  console.info("PEC Dubai inquiry received", parsed.data);

  return NextResponse.json({
    success: true,
    message: "Your consultation request has been received. PEC Dubai will reply shortly.",
  });
}
