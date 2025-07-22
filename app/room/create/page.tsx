"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Code, Settings, Trophy, Lightbulb } from "lucide-react";

export default function Page() {
  const [roomSettings, setRoomSettings] = useState({
    roomName: "",
    maxParticipants: "10",
    timeLimit: "30",
    difficulty: "",
    challenge: "",
    allowHints: true,
    description: ""
  });

  const challenges = [
    { id: "two-sum", name: "Two Sum", difficulty: "Easy" },
    { id: "binary-tree", name: "Binary Tree Traversal", difficulty: "Medium" },
    { id: "merge-sort", name: "Merge Sort Implementation", difficulty: "Medium" },
    { id: "graph-traversal", name: "Graph Traversal", difficulty: "Hard" },
    { id: "dynamic-programming", name: "Dynamic Programming", difficulty: "Hard" }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setRoomSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateRoom = () => {
    console.log("Creating room with settings:", roomSettings);
    // Handle room creation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Create Room Challenge</h1>
          <p className="text-gray-600">
            Set up a new coding room for collaborative problem solving
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Room Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Room Details
                </CardTitle>
                <CardDescription>Configure your coding room settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="roomName">Room Name</Label>
                  <Input
                    id="roomName"
                    placeholder="Enter room name"
                    value={roomSettings.roomName}
                    onChange={(e) => handleInputChange("roomName", e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose of this room..."
                    value={roomSettings.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Select
                      value={roomSettings.maxParticipants}
                      onValueChange={(value) => handleInputChange("maxParticipants", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 participants</SelectItem>
                        <SelectItem value="10">10 participants</SelectItem>
                        <SelectItem value="20">20 participants</SelectItem>
                        <SelectItem value="50">50 participants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="timeLimit">Time Limit</Label>
                    <Select
                      value={roomSettings.timeLimit}
                      onValueChange={(value) => handleInputChange("timeLimit", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Challenge Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Challenge Selection
                </CardTitle>
                <CardDescription>Choose the coding challenge for this room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="challenge">Challenge</Label>
                  <Select
                    value={roomSettings.challenge}
                    onValueChange={(value) => handleInputChange("challenge", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      {challenges.map((challenge) => (
                        <SelectItem key={challenge.id} value={challenge.id}>
                          <div className="flex w-full items-center justify-between">
                            <span>{challenge.name}</span>
                            <Badge
                              variant={
                                challenge.difficulty === "Easy"
                                  ? "secondary"
                                  : challenge.difficulty === "Medium"
                                    ? "default"
                                    : "destructive"
                              }
                              className="ml-2"
                            >
                              {challenge.difficulty}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Room Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Room Options
                </CardTitle>
                <CardDescription>Additional settings for your room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Allow Hints</Label>
                    <p className="text-sm text-gray-500">
                      Participants can access hints during the challenge
                    </p>
                  </div>
                  <Switch
                    checked={roomSettings.allowHints}
                    onCheckedChange={(checked) => handleInputChange("allowHints", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Room Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Room Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Max {roomSettings.maxParticipants} participants</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{roomSettings.timeLimit} minutes</span>
                </div>

                {roomSettings.difficulty && (
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-gray-600" />
                    <Badge
                      variant={
                        roomSettings.difficulty === "easy"
                          ? "secondary"
                          : roomSettings.difficulty === "medium"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {roomSettings.difficulty.charAt(0).toUpperCase() +
                        roomSettings.difficulty.slice(1)}
                    </Badge>
                  </div>
                )}

                {roomSettings.allowHints && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lightbulb className="h-4 w-4" />
                    <span>Hints available</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleCreateRoom}
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={!roomSettings.roomName || !roomSettings.challenge}
              >
                Create Room
              </Button>
            </div>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• Choose appropriate time limits based on challenge difficulty</p>
                <p>• Enable hints for beginners to improve learning</p>
                <p>• Consider the skill level of your participants</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
