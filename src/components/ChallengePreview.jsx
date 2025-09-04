import { Clock, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { difficultyOptions, timeLimitOptions } from "@/lib/constants";

export function ChallengePreview({
  title,
  description,
  difficulty,
  maxParticipants,
  timeLimit,
  selectedChallenge
}) {
  return (
    <Card className="bg-card border-border mt-6">
      <CardHeader>
        <CardTitle className="text-card-foreground">Preview</CardTitle>
        <CardDescription>This is how your challenge will appear to other users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-card-foreground text-lg font-semibold">
                {title || "Challenge Title"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {description || "Challenge description will appear here..."}
              </p>
            </div>
            <Badge
              className={
                difficultyOptions.find((d) => d.value === difficulty)?.color ||
                "bg-secondary text-secondary-foreground"
              }
            >
              {difficultyOptions.find((d) => d.value === difficulty)?.label || "Difficulty"}
            </Badge>
          </div>

          {selectedChallenge && (
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={selectedChallenge.profiles.avatar_url} />
                <AvatarFallback className="text-xs">
                  {selectedChallenge.profiles.display_name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground text-sm">
                {selectedChallenge.profiles.display_name}
              </span>
            </div>
          )}

          <div className="flex items-center justify-start gap-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Users className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground">{maxParticipants}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground">
                {timeLimitOptions.find((t) => t.value === timeLimit)?.label || "Time Limit"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
