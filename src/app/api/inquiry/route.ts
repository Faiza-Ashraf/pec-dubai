import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.email(),
  brief: z.string().optional(),
});

const RECIPIENT_EMAIL = "pioneer_consultants@yahoo.com";
// Use default Resend sender or verified custom domain
const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = inquirySchema.safeParse(payload);

    if (!parsed.success) {
      console.error("Validation error:", parsed.error);
      return NextResponse.json(
        { success: false, message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set in environment variables");
      return NextResponse.json(
        { success: false, message: "Email service not configured. Please try again later." },
        { status: 500 },
      );
    }

    console.log("Sending email to:", RECIPIENT_EMAIL);
    console.log("Sending from:", SENDER_EMAIL);

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: RECIPIENT_EMAIL,
        subject: `New Inquiry from ${parsed.data.name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e1e1e; margin-bottom: 24px;">New Consultation Request</h2>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 12px 0;">
                <strong style="color: #666;">Name:</strong><br/>
                <span style="color: #333;">${parsed.data.name}</span>
              </p>
              
              <p style="margin: 0 0 12px 0;">
                <strong style="color: #666;">Email:</strong><br/>
                <span style="color: #333;"><a href="mailto:${parsed.data.email}" style="color: #b8976a; text-decoration: none;">${parsed.data.email}</a></span>
              </p>
              
              <p style="margin: 0 0 12px 0;">
                <strong style="color: #666;">Phone:</strong><br/>
                <span style="color: #333;"><a href="tel:${parsed.data.phone}" style="color: #b8976a; text-decoration: none;">${parsed.data.phone}</a></span>
              </p>
              
              ${parsed.data.brief ? `
              <p style="margin: 0;">
                <strong style="color: #666;">Project Brief:</strong><br/>
                <span style="color: #333; white-space: pre-wrap;">${parsed.data.brief}</span>
              </p>
              ` : ""}
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e0e0e0;">
              This email was sent from the PEC Dubai contact form.
            </p>
          </div>
        `,
      }),
    });

    const responseText = await emailResponse.text();
    console.log("Resend API response status:", emailResponse.status);
    console.log("Resend API response:", responseText);

    if (!emailResponse.ok) {
      console.error("Failed to send email via Resend:", responseText);
      return NextResponse.json(
        { success: false, message: `Email service error: ${emailResponse.status}. Please try again.` },
        { status: emailResponse.status },
      );
    }

    console.log("Email sent successfully");
    return NextResponse.json({
      success: true,
      message: "Your consultation request has been received. PEC Dubai will reply shortly.",
    });
  } catch (error) {
    console.error("Error in inquiry route:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
