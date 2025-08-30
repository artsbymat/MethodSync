import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig, Clock, Trophy, Users } from "lucide-react";

export default function StatsCards() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/20 rounded-lg p-3">
              <CircleCheckBig className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-card-foreground text-2xl font-bold">12</p>
              <p className="text-muted-foreground text-sm">Challenges Complete</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-accent/20 rounded-lg p-3">
              <Trophy className="text-accent h-6 w-6" />
            </div>
            <div>
              <p className="text-card-foreground text-2xl font-bold">7</p>
              <p className="text-muted-foreground text-sm">Total Wins</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-green-500/20 p-3">
              <Clock className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-card-foreground text-2xl font-bold">8.5h</p>
              <p className="text-muted-foreground text-sm">Time Coding</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
