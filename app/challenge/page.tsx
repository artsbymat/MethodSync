import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Clock } from "lucide-react";
import JoinRoomForm from "@/components/JoinRoomForm";
import QuickStats from "@/components/QuickStats";

export default function page() {
  const challenges = [
    {
      id: 1,
      name: "Two Sum",
      description:
        "Find two numbers in an array that add up to a target sum. A classic problem to test your understanding of hash maps and array manipulation.",
      level: "Easy",
      levelColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      name: "Binary Tree Traversal",
      description:
        "Implement different methods to traverse a binary tree including in-order, pre-order, and post-order traversal algorithms.",
      level: "Medium",
      levelColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 3,
      name: "Dynamic Programming - Knapsack",
      description:
        "Solve the classic 0/1 knapsack problem using dynamic programming. Optimize for both time and space complexity.",
      level: "Hard",
      levelColor: "bg-red-100 text-red-800"
    },
    {
      id: 4,
      name: "String Palindrome",
      description:
        "Check if a given string is a palindrome, considering only alphanumeric characters and ignoring case sensitivity.",
      level: "Easy",
      levelColor: "bg-green-100 text-green-800"
    },
    {
      id: 5,
      name: "Graph Shortest Path",
      description:
        "Implement Dijkstra's algorithm to find the shortest path between nodes in a weighted graph structure.",
      level: "Hard",
      levelColor: "bg-red-100 text-red-800"
    },
    {
      id: 6,
      name: "Array Rotation",
      description:
        "Rotate an array to the right by k steps. Try to solve it in-place with O(1) extra space complexity.",
      level: "Medium",
      levelColor: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <div className="mt-18 min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <JoinRoomForm />

            <QuickStats />
          </div>

          {/* Code Challenges Column */}
          <div className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Code className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Code Challenges</h2>
                <p className="text-muted-foreground">
                  Practice your coding skills with these challenges
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {challenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className="bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold">{challenge.name}</h3>
                        <Badge className={challenge.levelColor} variant="secondary">
                          {challenge.level}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">30 min</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {challenge.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <span>🏆 245 solved</span>
                        <span>💡 Hints available</span>
                      </div>
                      <Button size="sm">Start Challenge</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4 text-center">
              <Button variant="outline">Load More Challenges</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
