import { Clock, Code2, LogOut, Play, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { difficultyColors } from "@/utils/constants";
import { Badge } from "./ui/badge";

export default function Header() {
  return (
    <header className="border-border bg-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded-lg p-2">
              <Code2 className="text-primary-foreground h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-xl font-bold">Method Sync</h1>
              <div className="flex items-center space-x-2">
                <p className="text-muted-foreground text-sm">Coding Challenges</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-foreground text-sm font-medium">John Doe</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
