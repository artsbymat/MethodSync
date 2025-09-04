"use client";

import { useEffect, useMemo, useState } from "react";
import { Combobox } from "@/components/Combobox";
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
import { useChallenges } from "@/hooks/useChallenges";
import { difficultyOptions, timeLimitOptions } from "@/lib/constants";
import { Clock, Trophy, Users } from "lucide-react";
import { ChallengePreview } from "@/components/ChallengePreview";
import { useDebounce } from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/Spinner";

export default function CreateChallengePage() {
  const router = useRouter();
  const { challenges: listChallenges, loading: isLoadingChallenges } = useChallenges();

  const challengesOptions = useMemo(
    () => listChallenges.map((c) => ({ label: c.title, value: c.id })),
    [listChallenges]
  );

  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const selectedChallenge = listChallenges.find((c) => c.id === selectedChallengeId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    maxParticipants: "",
    timeLimit: ""
  });

  const debouncedFormData = {
    title: useDebounce(formData.title),
    description: useDebounce(formData.description),
    difficulty: useDebounce(formData.difficulty),
    maxParticipants: useDebounce(formData.maxParticipants),
    timeLimit: useDebounce(formData.timeLimit)
  };

  const [isLoadingCreateRoom, setIsLoadingCreateRoom] = useState(false);

  function parseTimeToMinutes(timeStr) {
    if (!timeStr) return "";
    const [hh, mm] = timeStr.split(":");
    return String(parseInt(hh, 10) * 60 + parseInt(mm, 10));
  }

  useEffect(() => {
    if (selectedChallenge) {
      setFormData((prev) => ({
        ...prev,
        title: selectedChallenge.title || "",
        description: selectedChallenge.description || "",
        difficulty: selectedChallenge.difficulty || "",
        timeLimit: parseTimeToMinutes(selectedChallenge.estimated_time),
        maxParticipants: prev.maxParticipants || "10"
      }));
    }
  }, [selectedChallenge]);

  const handleChange = (key) => (eOrValue) => {
    const value = eOrValue?.target ? eOrValue.target.value : eOrValue;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateRoom = async () => {
    if (!selectedChallengeId) return alert("Please select a challenge");
    if (!formData.title) return alert("Please enter a title");
    if (!formData.description) return alert("Please enter a description");
    if (!formData.difficulty) return alert("Please select a difficulty");
    if (!formData.maxParticipants) return alert("Please select max participants");
    if (!formData.timeLimit) return alert("Please select a time limit");

    setIsLoadingCreateRoom(true);
    try {
      const response = await fetch("/api/room/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          challengeId: selectedChallengeId,
          title: formData.title,
          description: formData.description,
          difficulty: formData.difficulty,
          maxParticipants: parseInt(formData.maxParticipants, 10),
          timeLimit: parseInt(formData.timeLimit, 10)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const data = await response.json();

      if (data.success) {
        setIsLoadingCreateRoom(false);
        router.replace(`/room/lobby/${data.room.room_code}`);
      }
    } catch (error) {
      console.error(error);
      setIsLoadingCreateRoom(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-foreground mb-2 text-3xl font-bold">Create New Challenge</h2>
          <p className="text-muted-foreground text-lg">
            Set up a coding challenge for other developers to join
          </p>
        </div>

        {isLoadingChallenges ? (
          <div>
            <Skeleton className="mb-6 h-screen w-full rounded-xl bg-slate-700" />
          </div>
        ) : (
          <>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Challenge Details</CardTitle>
                <CardDescription>
                  Fill in the information below to create your coding challenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  {/* Challenge */}
                  <div className="space-y-2">
                    <Label htmlFor="challenge">Select Challenge *</Label>
                    <Combobox
                      id="challenge"
                      options={challengesOptions}
                      placeholder={isLoadingChallenges ? "Loading..." : "Search title"}
                      value={selectedChallengeId}
                      onChange={setSelectedChallengeId}
                      disabled={isLoadingChallenges}
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Room Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Array Algorithms Challenge"
                      maxLength={100}
                      value={formData.title}
                      onChange={handleChange("title")}
                    />
                    <p className="text-muted-foreground text-xs">
                      {formData.title.length}/100 characters
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what participants will be working on..."
                      maxLength={500}
                      value={formData.description}
                      onChange={handleChange("description")}
                      className="min-h-[100px]"
                    />
                    <p className="text-muted-foreground text-xs">
                      {formData.description.length}/500 characters
                    </p>
                  </div>

                  {/* Difficulty */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level *</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={handleChange("difficulty")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficultyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Max Participants */}
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Max Participants *</Label>
                      <Select
                        value={formData.maxParticipants}
                        onValueChange={handleChange("maxParticipants")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select max participants" />
                        </SelectTrigger>
                        <SelectContent>
                          {[10, 20, 30, 40, 50].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              <Users className="mr-2 h-4 w-4" />
                              {num} participants
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Time Limit */}
                  <div className="space-y-2">
                    <Label htmlFor="time-limit">Time Limit *</Label>
                    <Select value={formData.timeLimit} onValueChange={handleChange("timeLimit")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time limit" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeLimitOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <Clock className="mr-2 h-4 w-4" />
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4 pt-4">
                    <Button type="button" variant="secondary" className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 cursor-pointer"
                      onClick={handleCreateRoom}
                      disabled={isLoadingCreateRoom}
                    >
                      {isLoadingCreateRoom ? (
                        <>
                          <Spinner size="1rem" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Trophy className="mr-2 h-4 w-4" />
                          Create Live Room
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview */}
            <ChallengePreview {...debouncedFormData} selectedChallenge={selectedChallenge} />
          </>
        )}
      </div>
    </div>
  );
}
