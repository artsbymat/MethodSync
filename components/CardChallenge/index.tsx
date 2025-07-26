import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  estimated_time: number;
  category: string;
}

const difficultyStyle = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800"
};

const CardChallenge: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const { title, description, difficulty, estimated_time, category } = challenge;

  return (
    <Card className="bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <Badge
              className={cn(difficultyStyle[difficulty], "text-xs font-medium")}
              variant="secondary"
            >
              {difficulty}
            </Badge>
          </div>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4" />
            <span>{estimated_time} Minutes</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {description.slice(0, 150) + "..."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm">
            {category}
          </Badge>
          <Button size="sm" asChild>
            <Link href={`/challenge/${challenge.slug}`}>Start Challenge</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardChallenge;
