import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
        error: error.message
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Logout successful"
    },
    { status: 200 }
  );
}
