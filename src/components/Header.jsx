import { Clock, Code2, LogOut, Play, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { difficultyColors } from "@/utils/constants";
import { Badge } from "./ui/badge";

export default function Header({ challenge }) {
  const { title, difficulty, timeLimit } = challenge || {};

  return (
    <header className="border-border bg-card border-b">
      <div className={`${challenge ? "" : "container"} mx-auto px-4 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded-lg p-2">
              <Code2 className="text-primary-foreground h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-xl font-bold">{title || "Method Sync"}</h1>

              {difficulty ? (
                <div className="flex items-center space-x-2">
                  <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
                  <span className="text-muted-foreground flex items-center text-sm">
                    <Clock className="mr-1 h-3 w-3" />
                    {timeLimit}
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p className="text-muted-foreground text-sm">Coding Challenges</p>
                </div>
              )}
            </div>
          </div>
          {challenge ? (
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
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-foreground text-sm font-medium">John Doe</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
