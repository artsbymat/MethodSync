import { Clock, Code2, LogOut, Play, Trophy } from "lucide-react";
import { difficultyColors } from "@/utils/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeaderChallenge({ challenge }) {
  const { title, difficulty, timeLimit } = challenge || {};

  return (
    <header className="border-border bg-card border-b">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded-lg p-2">
              <Code2 className="text-primary-foreground h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-xl font-bold">{title}</h1>

              <div className="flex items-center space-x-2">
                <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
                <span className="text-muted-foreground flex items-center text-sm">
                  <Clock className="mr-1 h-3 w-3" />
                  {timeLimit}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-green-600 text-white hover:bg-green-700">
              <Play className="mr-2 h-4 w-4" />
              Run Code
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Trophy className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
