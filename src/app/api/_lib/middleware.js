import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function requireUser() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorizedddd");
  }

  return user;
}
