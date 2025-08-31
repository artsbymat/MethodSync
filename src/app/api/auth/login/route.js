import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const AUTH_CALLBACK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;

export async function POST() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: AUTH_CALLBACK_URL }
  });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Login failed"
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      error: null,
      message: "Redirecting to Google...",
      url: data.url
    },
    { status: 200 }
  );
}
