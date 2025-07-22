"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Send, Clock, CheckCircle, XCircle, Users } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Page() {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    
}`);

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; expected: string; actual: string }>
  >([]);

  const challenge = {
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ]
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    setOutput("Running tests...\n");

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockResults = [
      { passed: true, input: "[2,7,11,15], 9", expected: "[0,1]", actual: "[0,1]" },
      { passed: true, input: "[3,2,4], 6", expected: "[1,2]", actual: "[1,2]" },
      { passed: false, input: "[3,3], 6", expected: "[0,1]", actual: "undefined" }
    ];

    setTestResults(mockResults);
    setOutput(`Test Results:
✓ Test case 1: PASSED
✓ Test case 2: PASSED  
✗ Test case 3: FAILED
  Expected: [0,1]
  Got: undefined

2/3 test cases passed`);
    setIsRunning(false);
  };

  const handleSubmit = () => {
    setOutput("Submitting solution...\n");
    // Simulate submission
    setTimeout(() => {
      setOutput(
        (prev) =>
          prev +
          "✓ Solution submitted successfully!\n✓ All test cases passed!\n🎉 Challenge completed!"
      );
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100svh-80px)] flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">{challenge.title}</h1>
          <Badge className="bg-green-100 text-green-800">{challenge.difficulty}</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>25:30</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>Room: ABC123</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Challenge Description */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full overflow-y-auto border-r bg-white">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-3 text-lg font-semibold">Problem Description</h2>
                  <p className="leading-relaxed text-gray-700">{challenge.description}</p>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold">Examples</h3>
                  <div className="space-y-4">
                    {challenge.examples.map((example, index) => (
                      <Card key={index} className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">Input: </span>
                              <code className="rounded bg-gray-200 px-2 py-1 text-sm">
                                {example.input}
                              </code>
                            </div>
                            <div>
                              <span className="font-medium">Output: </span>
                              <code className="rounded bg-gray-200 px-2 py-1 text-sm">
                                {example.output}
                              </code>
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Explanation: </span>
                              {example.explanation}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold">Constraints</h3>
                  <ul className="space-y-1">
                    {challenge.constraints.map((constraint, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        • {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel - Code Editor and Output */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Code Editor */}
            <ResizablePanel defaultSize={70} minSize={30}>
              <div className="flex h-full flex-col bg-gray-900 text-white">
                <div className="border-b border-gray-700 bg-gray-800 px-4 py-2">
                  <span className="text-sm text-gray-300">solution.js</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full flex-1 resize-none bg-gray-900 p-4 font-mono text-sm text-white outline-none"
                  style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                  spellCheck={false}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Output Section */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="flex h-full flex-col bg-white">
                <Tabs defaultValue="output" className="flex h-full flex-col">
                  <TabsList className="grid w-full grid-cols-2 rounded-none bg-gray-100">
                    <TabsTrigger value="output">Output</TabsTrigger>
                    <TabsTrigger value="tests">Test Results</TabsTrigger>
                  </TabsList>
                  <TabsContent value="output" className="m-0 flex-1">
                    <div className="h-full overflow-y-auto bg-gray-50 p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap">
                        {output || "Click 'Run Tests' to see output..."}
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="tests" className="m-0 flex-1">
                    <div className="h-full overflow-y-auto p-4">
                      {testResults.length > 0 ? (
                        <div className="space-y-2">
                          {testResults.map((result, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 rounded bg-gray-50 p-2"
                            >
                              {result.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <div className="flex-1 text-sm">
                                <div>
                                  Test case {index + 1}: {result.input}
                                </div>
                                {!result.passed && (
                                  <div className="mt-1 text-xs text-red-600">
                                    Expected: {result.expected}, Got: {result.actual}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-gray-500">
                          No test results yet. Run tests to see results.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                {/* Action Buttons */}
                <div className="flex gap-3 border-t bg-white p-4">
                  <Button
                    onClick={handleRunTests}
                    disabled={isRunning}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {isRunning ? "Running..." : "Run Tests"}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    variant="default"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                    Submit Code
                  </Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
