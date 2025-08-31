import { Combobox } from "@/components/Combobox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { difficultyOptions, timeLimitOptions, challengesOptions } from "@/lib/dummy-data";
import { Clock, Plus, Trophy, Users, X } from "lucide-react";

export default function CreateChallengePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-foreground mb-2 text-3xl font-bold">Create New Challenge</h2>
          <p className="text-muted-foreground text-lg">
            Set up a coding challenge for other developers to join
          </p>
        </div>

        {/* Create Room Form */}
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
                <Label htmlFor="title" className="text-card-foreground">
                  Select Challenge *
                </Label>
                <Combobox
                  options={challengesOptions}
                  label="Select challenge title"
                  placeholder="Search title"
                />
              </div>
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-card-foreground">
                  Room Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Array Algorithms Challenge"
                  className="bg-input border-border text-foreground"
                  maxLength={100}
                />
                <p className="text-muted-foreground text-xs">10/100 characters</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-card-foreground">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what participants will be working on..."
                  className="bg-input border-border text-foreground min-h-[100px]"
                  maxLength={500}
                />
                <p className="text-muted-foreground text-xs">200/500 characters</p>
              </div>

              {/* Difficulty and Max particapants row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-card-foreground">Difficulty Level *</Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`h-2 w-2 rounded-full ${option.color.split(" ")[0]}`} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Max Participants */}
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="text-card-foreground">
                    Max Participants
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select max participants" />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 30, 40, 50].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{num} participants</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Time Limit and Max Participants Row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-card-foreground">Time Limit *</Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select time limit" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeLimitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  className="bg-secondary hover:bg-secondary/90 text-primary-foreground flex-1 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 cursor-pointer"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Create Challenge
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="bg-card border-border mt-6">
          <CardHeader>
            <CardTitle className="text-card-foreground">Preview</CardTitle>
            <CardDescription>This is how your challenge will appear to other users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-card-foreground text-lg font-semibold">Challenge Title</h3>
                  <p className="text-muted-foreground text-sm">
                    Challenge description will appear here...
                  </p>
                </div>
                <Badge
                  className={
                    difficultyOptions.find((d) => d.value === "hard")?.color ||
                    "bg-secondary text-secondary-foreground"
                  }
                >
                  {difficultyOptions.find((d) => d.value === "hard")?.label}
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">JD</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm">Hosted by John Doe</span>
              </div>

              <div className="flex items-center justify-start gap-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">10/20</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">30 Minutes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
