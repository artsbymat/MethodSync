import Header from "@/components/Header";
import RegularChallenges from "@/components/RegularChallenges";

export default async function ChallengesPage() {
  return (
    <div className="mx-auto">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <RegularChallenges />
      </div>
    </div>
  );
}
