import { Clock, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { difficultyColors } from "@/lib/constants";

export default function ChallengeCard({ challenge, onClick }) {
  return (
    <Card
      key={challenge.id}
      className="bg-card border-border hover:border-primary transition-all duration-200"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-card-foreground text-lg">{challenge.title}</CardTitle>
            <CardDescription className="text-sm">{challenge.description}</CardDescription>
          </div>
          <Badge className={[difficultyColors[challenge.difficulty], "capitalize"]}>
            {challenge.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center gap-x-2 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">{challenge.estimated_time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">{challenge.favorite_count}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {challenge.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary/50 text-secondary-foreground text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={challenge.profiles.avatar_url} />
            <AvatarFallback className="text-xs">
              {challenge.profiles.display_name
                ? challenge.profiles.display_name.charAt(0).toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground text-sm">
            Created by {challenge.profiles.display_name}
          </span>
        </div>

        {/* Button */}
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full cursor-pointer"
          onClick={onClick}
        >
          Start Practice
        </Button>
      </CardContent>
    </Card>
  );
}
