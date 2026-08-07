import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(40),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  productInterest: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(5000),
  consent: z.boolean().refine((value) => value === true),
});

function canSendMail() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO_EMAIL);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: "Validation failed." }, { status: 400 });
    }

    const data = parsed.data;
    const to = process.env.CONTACT_TO_EMAIL || "info@weecomi.com";
    const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || "noreply@weecomi.com";

    const text = [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Company: ${data.company || "-"}`,
      `Product interest: ${data.productInterest}`,
      "",
      data.message,
    ].join("\n");

    if (!canSendMail()) {
      console.log("[contact] SMTP not configured. Mock success payload:");
      console.log(text);
      return Response.json({
        ok: true,
        mocked: true,
        message: "Contact request accepted (SMTP mock mode).",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: data.email,
      subject: `WeeComi Contact — ${data.productInterest} — ${data.fullName}`,
      text,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }
}
