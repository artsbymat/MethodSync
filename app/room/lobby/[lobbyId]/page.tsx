"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  Clock,
  Code,
  Settings,
  Copy,
  Crown,
  Send,
  UserPlus,
  Play,
  MessageCircle,
  Trophy,
  Lightbulb,
  Share2
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  status: "ready" | "not-ready" | "away";
  joinedAt: Date;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: "message" | "system";
}

export default function LobbyRoomPage() {
  const [roomCode] = useState("ABC123");
  const [isHost] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [showChat, setShowChat] = useState(true);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      isHost: true,
      status: "ready",
      joinedAt: new Date(Date.now() - 300000)
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      isHost: false,
      status: "ready",
      joinedAt: new Date(Date.now() - 180000)
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      isHost: false,
      status: "not-ready",
      joinedAt: new Date(Date.now() - 120000)
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      userId: "system",
      userName: "System",
      message: "Welcome to the coding room! Waiting for more participants...",
      timestamp: new Date(Date.now() - 300000),
      type: "system"
    },
    {
      id: "2",
      userId: "2",
      userName: "Sarah Johnson",
      message: "Hey everyone! Ready for the challenge?",
      timestamp: new Date(Date.now() - 240000),
      type: "message"
    },
    {
      id: "3",
      userId: "3",
      userName: "Mike Rodriguez",
      message: "Just reviewing the problem statement. Give me 2 minutes!",
      timestamp: new Date(Date.now() - 120000),
      type: "message"
    }
  ]);

  const roomInfo = {
    name: "Two Sum Challenge Room",
    challenge: "Two Sum",
    difficulty: "Easy",
    timeLimit: 30,
    maxParticipants: 10,
    allowHints: true,
    isPrivate: true
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    // Show toast notification
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: "1",
        userName: "Alex Chen",
        message: chatMessage,
        timestamp: new Date(),
        type: "message"
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setChatMessage("");
    }
  };

  const startChallenge = () => {
    console.log("Starting challenge...");
    // Handle challenge start
  };

  const toggleReady = () => {
    // Toggle current user's ready status
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    return `${diff}m ago`;
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate participant status changes
      if (Math.random() > 0.8) {
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === "3" ? { ...p, status: p.status === "ready" ? "not-ready" : "ready" } : p
          )
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const readyCount = participants.filter((p) => p.status === "ready").length;
  const canStart = readyCount >= 2 && isHost;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">{roomInfo.name}</h1>
              <p className="text-gray-600">Waiting for participants to join...</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2">
                <span className="text-sm font-medium">Room Code:</span>
                <code className="text-lg font-bold">{roomCode}</code>
                <Button variant="ghost" size="sm" onClick={copyRoomCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Invite
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Challenge Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Challenge Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Challenge</p>
                      <p className="font-medium">{roomInfo.challenge}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={roomInfo.difficulty === "Easy" ? "secondary" : "default"}>
                      {roomInfo.difficulty}
                    </Badge>
                    <div>
                      <p className="text-sm text-gray-500">Difficulty</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Time Limit</p>
                      <p className="font-medium">{roomInfo.timeLimit} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Hints</p>
                      <p className="font-medium">{roomInfo.allowHints ? "Enabled" : "Disabled"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Participants ({participants.length}/{roomInfo.maxParticipants})
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-green-200 text-green-600">
                      {readyCount} Ready
                    </Badge>
                    <Badge variant="outline" className="border-orange-200 text-orange-600">
                      {participants.length - readyCount} Not Ready
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{participant.name}</p>
                            {participant.isHost && <Crown className="h-4 w-4 text-yellow-500" />}
                          </div>
                          <p className="text-sm text-gray-500">
                            Joined {formatTime(participant.joinedAt)}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={participant.status === "ready" ? "default" : "secondary"}
                        className={
                          participant.status === "ready"
                            ? "border-green-200 bg-green-100 text-green-800"
                            : "border-orange-200 bg-orange-100 text-orange-800"
                        }
                      >
                        {participant.status === "ready" ? "Ready" : "Not Ready"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            {showChat && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Room Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="mb-4 h-64">
                    <div className="space-y-3">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.type === "system" ? "justify-center" : ""}`}
                        >
                          {message.type === "system" ? (
                            <div className="text-sm text-gray-500 italic">{message.message}</div>
                          ) : (
                            <>
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {message.userName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="mb-1 flex items-center gap-2">
                                  <span className="text-sm font-medium">{message.userName}</span>
                                  <span className="text-xs text-gray-500">
                                    {message.timestamp.toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit"
                                    })}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">{message.message}</p>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Room Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Room Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="outline" className="border-blue-200 text-blue-600">
                    Waiting
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Participants</span>
                  <span className="font-medium">
                    {participants.length}/{roomInfo.maxParticipants}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ready</span>
                  <span className="font-medium text-green-600">
                    {readyCount}/{participants.length}
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Room Type</span>
                    <Badge variant="outline">{roomInfo.isPrivate ? "Private" : "Public"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              {isHost ? (
                <Button
                  onClick={startChallenge}
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={!canStart}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Challenge
                </Button>
              ) : (
                <Button onClick={toggleReady} variant="outline" className="w-full bg-transparent">
                  Toggle Ready Status
                </Button>
              )}

              <Button variant="outline" className="w-full bg-transparent">
                <Settings className="mr-2 h-4 w-4" />
                Room Settings
              </Button>

              <Button
                variant="outline"
                className="w-full border-red-200 bg-transparent text-red-600 hover:bg-red-50"
              >
                Leave Room
              </Button>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" onClick={copyRoomCode}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Room Code
                </Button>

                <Button variant="ghost" className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Friends
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setShowChat(!showChat)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {showChat ? "Hide" : "Show"} Chat
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• Make sure all participants are ready before starting</p>
                <p>• Use the chat to discuss strategy or ask questions</p>
                <p>• The host can start the challenge when ready</p>
                <p>• Room code expires after 2 hours of inactivity</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
