import { Hash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function JoinRoom() {
  return (
    <div className="mb-8">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center text-xl">
            <Hash className="text-primary mr-2 h-5 w-5" />
            Join Real-time Challenge
          </CardTitle>
          <CardDescription>
            Enter a room code to join a live multiplayer coding challenge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="roomCode" className="text-foreground text-sm font-medium">
                Room Code
              </Label>
              <Input
                id="roomCode"
                placeholder="Enter 6-digit room code (e.g., ABC123)"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground mt-1"
                maxLength={6}
              />
            </div>
            <div className="flex items-end">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground cursor-pointer">
                Join Room
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
