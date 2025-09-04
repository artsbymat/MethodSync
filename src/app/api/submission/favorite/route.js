import { NextResponse } from "next/server";
import { requireUser } from "../../_lib/middleware";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: existing, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .eq("challenge_id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ favorited: !!existing });
}

export async function POST(request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: existing, error: checkError } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .eq("challenge_id", id)
    .maybeSingle();

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existing) {
    const { error: delError } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("challenge_id", id);

    if (delError) {
      return NextResponse.json({ error: delError.message }, { status: 500 });
    }

    return NextResponse.json({ favorited: false });
  } else {
    const { error: insError } = await supabase
      .from("favorites")
      .insert([{ user_id: user.id, challenge_id: id }]);

    if (insError) {
      return NextResponse.json({ error: insError.message }, { status: 500 });
    }

    return NextResponse.json({ favorited: true });
  }
}
