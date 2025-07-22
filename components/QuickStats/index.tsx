import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const QuickStats = () => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-muted-foreground text-sm">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-muted-foreground text-sm">Streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
