import { Clock, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { initialRooms } from "@/lib/dummy-data";
import { difficultyColors } from "@/lib/constants";

export default function RegularChallenges() {
  return (
    <>
      <div className="mb-6 flex items-center justify-start">
        <div>
          <h3 className="text-foreground text-2xl font-bold">Regular Challenges</h3>
          <p className="text-muted-foreground">Practice coding challenges at your own pace</p>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialRooms.map((room) => (
          <Card
            key={room.id}
            className={`bg-card border-border hover:border-primary cursor-pointer transition-all duration-200 ${
              true ? "border-primary/50" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-card-foreground text-lg">{room.title}</CardTitle>
                  <CardDescription className="text-sm">{room.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={difficultyColors[room.difficulty]}>{room.difficulty}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Room Stats */}
              <div className="flex items-center gap-x-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">{room.timeLimit}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">120</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {room.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-secondary/50 text-secondary-foreground text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Host Info */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {room.host
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm">Hosted by {room.host}</span>
              </div>

              {/* Join Button */}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full cursor-pointer">
                Start Practice
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
