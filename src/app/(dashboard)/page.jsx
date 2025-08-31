import RegularChallenges from "@/components/RegularChallenges";
import Welcome from "@/app/(dashboard)/_components/Welcome";
import StatsCards from "./_components/StatsCards";
import JoinRoom from "./_components/JoinRoom";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Welcome />

      <StatsCards />

      <JoinRoom />

      <RegularChallenges />
    </div>
  );
}
