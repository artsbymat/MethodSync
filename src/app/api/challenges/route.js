import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("challenges")
    .select(
      `
      id,
      title,
      slug,
      difficulty,
      description,
      tags,
      estimated_time,
      favorites(count),
      profiles ( id, display_name, avatar_url )
    `
    )
    .eq("status", "published")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Failed to fetch challenges"
      },
      { status: 500 }
    );
  }

  const challenges = data.map((c) => ({
    ...c,
    favorites_count: c.favorites[0]?.count ?? 0,
    favorites: undefined
  }));

  return NextResponse.json(
    {
      success: true,
      error: null,
      message: "Challenges fetched successfully",
      challenges
    },
    { status: 200 }
  );
}
