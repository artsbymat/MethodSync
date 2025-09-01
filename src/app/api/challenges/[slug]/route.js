import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request, { params }) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("challenges")
    .select(
      `
      id,
      title,
      slug,
      difficulty,
      instruction,
      starter_code,
      tags,
      estimated_time,
      test_cases,
      favorites(count)
    `
    )
    .eq("slug", slug)
    .eq("status", "published")
    .is("deleted_at", null)
    .single();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Failed to fetch challenge"
      },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        error: "Challenge not found",
        message: "Challenge not found"
      },
      { status: 404 }
    );
  }

  const challenge = {
    ...data,
    favorite_count: data.favorites?.[0]?.count ?? 0,
    favorites: undefined
  };

  return NextResponse.json(
    {
      success: true,
      error: null,
      message: "Challenge fetched successfully",
      challenge
    },
    { status: 200 }
  );
}
