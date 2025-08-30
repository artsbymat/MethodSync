import JoinRoom from "@/components/JoinRoom";
import RegularChallenges from "@/components/RegularChallenges";
import StatsCards from "@/components/StatsCards";
import Welcome from "@/components/Welcome";

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
