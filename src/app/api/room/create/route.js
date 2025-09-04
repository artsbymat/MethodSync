import { NextResponse } from "next/server";
import { requireUser } from "../../_lib/middleware";
import { createClient } from "@/lib/supabase/server";

function generateRoomCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { challengeId, title, description, difficulty, maxParticipants, timeLimit } = body;

  if (!challengeId || !title || !timeLimit) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = await createClient();

  // Pastikan room_code unik
  let roomCode;
  let isUnique = false;
  while (!isUnique) {
    roomCode = generateRoomCode();
    const { data: existing } = await supabase
      .from("rooms")
      .select("id")
      .eq("room_code", roomCode)
      .maybeSingle();
    if (!existing) isUnique = true;
  }

  const intervalStr = `${parseInt(timeLimit, 10)} minutes`;

  const { data, error } = await supabase
    .from("rooms")
    .insert([
      {
        challenge_id: challengeId,
        title,
        description,
        difficulty,
        time_limit: intervalStr,
        room_code: roomCode,
        host_id: user.id,
        max_participants: maxParticipants ? parseInt(maxParticipants, 10) : 50
      }
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, room: data });
}
