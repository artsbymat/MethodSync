import { Clock, Code2, LogOut, Play, Star, Trophy } from "lucide-react";
import { difficultyColors } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";

export default function HeaderChallenge({ challenge, run, onTabChange, submit, isSubmitting }) {
  const { title, difficulty, estimated_time } = challenge || {};
  const handleSubmit = () => {
    onTabChange("output");
    submit();
  };

  const isFavorited = true; // TODO: replace with actual favorite state
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
                <Badge className={difficultyColors[difficulty]}>
                  <span className="capitalize">{difficulty}</span>
                </Badge>
                <span className="text-muted-foreground flex items-center text-sm">
                  <Clock className="mr-1 h-3 w-3" />
                  {estimated_time}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              className="cursor-pointer bg-green-600 text-white hover:bg-green-700"
              onClick={run}
            >
              <Play className="mr-2 h-4 w-4" />
              Test Code
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : <Trophy className="mr-2 h-4 w-4" />}
              Submit
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
