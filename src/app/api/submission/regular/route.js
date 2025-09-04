import { NextResponse } from "next/server";
import { requireUser } from "../../_lib/middleware";
import { createClient } from "@/lib/supabase/server";
import { extractFunctionName } from "@/lib/utils";
import { runUserCode } from "../_lib/grader";

export async function POST(request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, code } = body;

  if (!id || !code) {
    return NextResponse.json({ error: "Missing id or code" }, { status: 400 });
  }

  // get challenge from supabase
  const supabase = await createClient();
  const { data: challenge, error: challengeError } = await supabase
    .from("challenges")
    .select(`id, hidden_test_cases, starter_code`)
    .eq("id", id)
    .single();

  if (challengeError || !challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }

  const functionName = extractFunctionName(challenge?.starter_code);

  const { results, status } = await runUserCode(code, functionName, challenge.hidden_test_cases);

  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .upsert(
      {
        challenge_id: challenge.id,
        user_id: user.id,
        code,
        status,
        test_results: results
      },
      { onConflict: ["user_id", "challenge_id"] }
    )
    .select()
    .single();

  if (submissionError) {
    return NextResponse.json({ error: submissionError.message }, { status: 500 });
  }

  return NextResponse.json({ submission });
}

export async function GET(request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .select("code")
    .eq("challenge_id", id)
    .eq("user_id", user.id)
    .single();

  if (submissionError) {
    return NextResponse.json({ error: submissionError.message }, { status: 500 });
  }

  return NextResponse.json({ submission });
}
