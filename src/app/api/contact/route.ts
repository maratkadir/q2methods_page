import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as ContactPayload;

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // TODO: connect an email service (e.g. Resend) to forward submissions to kadir@q2methods.de
  console.log("[contact form]", body);

  return NextResponse.json({ success: true });
}
