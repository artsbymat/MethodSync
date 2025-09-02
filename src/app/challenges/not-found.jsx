import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <h2 className="text-foreground text-2xl font-bold">404 - Challenge Not Found</h2>
      <p className="text-muted-foreground">The challenge you are looking for does not exist.</p>
      <Link
        href="/challenges"
        className="bg-primary hover:bg-primary/90 cursor-pointer rounded px-4 py-2 text-white"
      >
        Back to Challenges
      </Link>
    </div>
  );
}
