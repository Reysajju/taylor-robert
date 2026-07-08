import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = [
  "General Inquiry",
  "Press & Media Inquiry",
  "Speaking Request",
  "Rights & Permissions",
];

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const subject = typeof data.subject === "string" ? data.subject.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  // Validate fields
  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please provide your full name." },
      { status: 422 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  if (!VALID_SUBJECTS.includes(subject)) {
    return NextResponse.json(
      { ok: false, error: "Please select a valid subject." },
      { status: 422 },
    );
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Your message must be at least 10 characters." },
      { status: 422 },
    );
  }

  try {
    await db.contactInquiry.create({
      data: { name, email, subject, message },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] submit error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Contact inquiry endpoint. Use POST.",
  });
}