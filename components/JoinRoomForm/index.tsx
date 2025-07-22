import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function JoinRoomForm() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Join Coding Room</CardTitle>
        <CardDescription>
          Enter a room code to join a collaborative coding session with other developers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="roomCode" className="text-sm font-medium">
            Room Code
          </label>
          <Input
            id="roomCode"
            placeholder="Enter 6-digit room code"
            className="text-center text-lg tracking-widest"
            maxLength={6}
          />
        </div>
        <Button className="w-full" size="lg">
          Join Room
        </Button>
        <div className="text-center">
          <p className="text-muted-foreground mb-2 text-sm">Or create a new room</p>
          <Button variant="outline" className="w-full bg-transparent">
            Create New Room
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
