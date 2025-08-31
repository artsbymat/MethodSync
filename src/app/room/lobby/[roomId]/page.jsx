"use client";

import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { difficultyColors } from "@/lib/constants";
import { Check, Clock, Copy, Crown, Play, Trophy, Users } from "lucide-react";
import { useState } from "react";

// Mock room data
const mockRoomData = {
  id: "1",
  title: "Array Algorithms Challenge",
  description: "Master sorting and searching algorithms with real-time collaboration",
  difficulty: "Medium",
  host: {
    id: "host-1",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  maxParticipants: 6,
  timeLimit: "45 min",
  status: "waiting",
  tags: ["Arrays", "Sorting", "Binary Search"],
  roomCode: "ABC123"
};

// Mock participants data
const participants = [
  {
    id: "host-1",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    isHost: true,
    joinedAt: "2024-01-15T10:00:00Z",
    status: "ready"
  },
  {
    id: "user-2",
    name: "Sarah Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    isHost: false,
    joinedAt: "2024-01-15T10:02:00Z",
    status: "ready"
  },
  {
    id: "user-3",
    name: "Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    isHost: false,
    joinedAt: "2024-01-15T10:03:00Z",
    status: "ready"
  }
];

export default function LobbyPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(mockRoomData.roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy room code:", err);
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Room Info Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h2 className="text-foreground text-3xl font-bold">Room Title</h2>
                  <Badge className={difficultyColors[mockRoomData.difficulty]}>
                    {mockRoomData.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg">{mockRoomData.description}</p>
              </div>

              {/* Room Code */}
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="space-y-2 text-center">
                    <p className="text-muted-foreground text-sm">Room Code</p>
                    <div className="flex items-center space-x-2">
                      <code className="text-primary bg-primary/10 rounded px-3 py-1 font-mono text-lg font-bold">
                        {mockRoomData.roomCode}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyRoomCode}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Challenge Details */}
            <div className="text-muted-foreground flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Time Limit: {mockRoomData.timeLimit}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Max Participants: {mockRoomData.maxParticipants}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>Host: {mockRoomData.host.name}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {mockRoomData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-secondary/50 text-secondary-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Participants List */}
              <div className="lg:col-span-2">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-card-foreground">Participants 10</CardTitle>
                        <CardDescription>
                          {/* {isHost
                            ? "Manage participants and start the challenge"
                            : "Waiting for the host to start the challenge"}*/}
                          Manage participants and start the challenge
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {participants.map((participant, index) => (
                      <div key={participant.id}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={"/placeholder.svg"} />
                                <AvatarFallback>
                                  {participant.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`border-card absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 ${
                                  participant.status === "ready"
                                    ? "bg-green-400"
                                    : participant.status === "connecting"
                                      ? "animate-pulse bg-yellow-400"
                                      : "bg-red-400"
                                }`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="text-card-foreground font-medium">
                                  {participant.name}
                                </p>
                                {participant.isHost && (
                                  <Crown className="h-4 w-4 text-yellow-500" />
                                )}
                                <Badge variant="secondary" className="text-xs">
                                  You
                                </Badge>
                              </div>
                              <p className="text-muted-foreground text-sm">
                                Joined {new Date(participant.joinedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                participant.status === "ready"
                                  ? "border-green-500/30 bg-green-500/20 text-green-400"
                                  : participant.status === "connecting"
                                    ? "border-yellow-500/30 bg-yellow-500/20 text-yellow-400"
                                    : "border-red-500/30 bg-red-500/20 text-red-400"
                              }
                            >
                              {participant.status === "ready"
                                ? "Ready"
                                : participant.status === "connecting"
                                  ? "Connecting"
                                  : "Disconnected"}
                            </Badge>
                          </div>
                        </div>
                        {index < participants.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: mockRoomData.maxParticipants - participants.length }).map(
                      (_, index) => (
                        <div key={`empty-${index}`}>
                          <Separator />
                          <div className="flex items-center space-x-3 opacity-50">
                            <div className="border-muted-foreground/30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed">
                              <Users className="text-muted-foreground/50 h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-muted-foreground">Waiting for participant...</p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Action Panel */}
              <div className="space-y-6">
                {/* Host Actions */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Host Controls</CardTitle>
                    <CardDescription>Manage your challenge room</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                      size="lg"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Challenge
                    </Button>

                    {participants.length < 2 && (
                      <p className="text-muted-foreground text-center text-sm">
                        Need at least 2 participants to start
                      </p>
                    )}

                    <Separator />

                    <Button variant="outline" className="w-full bg-transparent">
                      Cancel Challenge
                    </Button>
                  </CardContent>
                </Card>
                {/* Participant View*/}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Waiting Room</CardTitle>
                    <CardDescription>The host will start the challenge soon</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="py-8 text-center">
                      <div className="animate-pulse">
                        <div className="bg-primary/20 mx-auto mb-4 w-fit rounded-full p-4">
                          <Clock className="text-primary h-8 w-8" />
                        </div>
                      </div>
                      <h3 className="text-card-foreground mb-2 text-lg font-semibold">
                        Waiting for Host
                      </h3>
                      <p className="text-muted-foreground">
                        {mockRoomData.host.name} will start the challenge when ready
                      </p>
                    </div>

                    <Separator />

                    <Button variant="outline" className="w-full bg-transparent">
                      Leave Room
                    </Button>
                  </CardContent>
                </Card>

                {/* Challenge Info */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Challenge Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge className={difficultyColors[mockRoomData.difficulty]}>
                        {mockRoomData.difficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Time Limit:</span>
                      <span className="text-card-foreground">{mockRoomData.timeLimit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="text-card-foreground">
                        {participants.length}/{mockRoomData.maxParticipants}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="border-blue-500/30 bg-blue-500/20 text-blue-400">
                        Waiting
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
