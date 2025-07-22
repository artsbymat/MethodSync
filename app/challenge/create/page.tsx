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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Lightbulb,
  Plus,
  Trash2,
  Eye,
  Clock,
  Target,
  FileText,
  TestTube
} from "lucide-react";

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

interface Hint {
  id: string;
  content: string;
  order: number;
}

export default function CustomChallengePage() {
  const [challenge, setChallenge] = useState({
    title: "",
    description: "",
    difficulty: "",
    timeLimit: "30",
    category: "",
    constraints: "",
    examples: "",
    starterCode: "",
    solution: ""
  });

  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "1", input: "", expectedOutput: "", isHidden: false }
  ]);

  const [hints, setHints] = useState<Hint[]>([{ id: "1", content: "", order: 1 }]);

  const [activeTab, setActiveTab] = useState("details");

  const handleChallengeChange = (field: string, value: string) => {
    setChallenge((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const addTestCase = () => {
    const newId = (testCases.length + 1).toString();
    setTestCases((prev) => [
      ...prev,
      {
        id: newId,
        input: "",
        expectedOutput: "",
        isHidden: false
      }
    ]);
  };

  const removeTestCase = (id: string) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: string | boolean) => {
    setTestCases((prev) => prev.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc)));
  };

  const addHint = () => {
    const newId = (hints.length + 1).toString();
    setHints((prev) => [
      ...prev,
      {
        id: newId,
        content: "",
        order: hints.length + 1
      }
    ]);
  };

  const removeHint = (id: string) => {
    setHints((prev) => prev.filter((h) => h.id !== id));
  };

  const updateHint = (id: string, content: string) => {
    setHints((prev) => prev.map((h) => (h.id === id ? { ...h, content } : h)));
  };

  const handleSaveChallenge = () => {
    console.log("Saving challenge:", { challenge, testCases, hints });
    // Handle save logic here
  };

  const handlePublishChallenge = () => {
    console.log("Publishing challenge:", { challenge, testCases, hints });
    // Handle publish logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Create Custom Challenge</h1>
          <p className="text-gray-600">Design your own coding challenge for the community</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="problem" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Problem
                </TabsTrigger>
                <TabsTrigger value="tests" className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  Tests
                </TabsTrigger>
                <TabsTrigger value="hints" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Hints
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>

              {/* Challenge Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Challenge Information
                    </CardTitle>
                    <CardDescription>Basic information about your challenge</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Challenge Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Two Sum Problem"
                        value={challenge.title}
                        onChange={(e) => handleChallengeChange("title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Short Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of what the challenge involves..."
                        value={challenge.description}
                        onChange={(e) => handleChallengeChange("description", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select
                          value={challenge.difficulty}
                          onValueChange={(value) => handleChallengeChange("difficulty", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={challenge.category}
                          onValueChange={(value) => handleChallengeChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="arrays">Arrays</SelectItem>
                            <SelectItem value="strings">Strings</SelectItem>
                            <SelectItem value="trees">Trees</SelectItem>
                            <SelectItem value="graphs">Graphs</SelectItem>
                            <SelectItem value="dynamic-programming">Dynamic Programming</SelectItem>
                            <SelectItem value="sorting">Sorting</SelectItem>
                            <SelectItem value="searching">Searching</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="timeLimit">Time Limit</Label>
                        <Select
                          value={challenge.timeLimit}
                          onValueChange={(value) => handleChallengeChange("timeLimit", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Problem Statement Tab */}
              <TabsContent value="problem" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Statement</CardTitle>
                    <CardDescription>Define the problem and provide examples</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="examples">Problem Description & Examples</Label>
                      <Textarea
                        id="examples"
                        placeholder="Describe the problem in detail. Include examples with input and output..."
                        value={challenge.examples}
                        onChange={(e) => handleChallengeChange("examples", e.target.value)}
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="constraints">Constraints</Label>
                      <Textarea
                        id="constraints"
                        placeholder="List any constraints (e.g., array length, value ranges, time complexity requirements)..."
                        value={challenge.constraints}
                        onChange={(e) => handleChallengeChange("constraints", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="starterCode">Starter Code (Optional)</Label>
                      <Textarea
                        id="starterCode"
                        placeholder="Provide starter code template..."
                        value={challenge.starterCode}
                        onChange={(e) => handleChallengeChange("starterCode", e.target.value)}
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Test Cases Tab */}
              <TabsContent value="tests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Test Cases</CardTitle>
                        <CardDescription>
                          Define input/output pairs to validate solutions
                        </CardDescription>
                      </div>
                      <Button onClick={addTestCase} size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Test Case
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {testCases.map((testCase, index) => (
                      <div key={testCase.id} className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Test Case {index + 1}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={testCase.isHidden}
                                onCheckedChange={(checked) =>
                                  updateTestCase(testCase.id, "isHidden", checked)
                                }
                              />
                              <Label className="text-sm">Hidden</Label>
                            </div>
                            {testCases.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeTestCase(testCase.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Input</Label>
                            <Textarea
                              placeholder="Enter test input..."
                              value={testCase.input}
                              onChange={(e) => updateTestCase(testCase.id, "input", e.target.value)}
                              rows={3}
                              className="font-mono text-sm"
                            />
                          </div>
                          <div>
                            <Label>Expected Output</Label>
                            <Textarea
                              placeholder="Enter expected output..."
                              value={testCase.expectedOutput}
                              onChange={(e) =>
                                updateTestCase(testCase.id, "expectedOutput", e.target.value)
                              }
                              rows={3}
                              className="font-mono text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Hints Tab */}
              <TabsContent value="hints" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Hints</CardTitle>
                        <CardDescription>
                          Provide progressive hints to help users solve the challenge
                        </CardDescription>
                      </div>
                      <Button onClick={addHint} size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Hint
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {hints.map((hint, index) => (
                      <div key={hint.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Label>Hint {index + 1}</Label>
                          {hints.length > 1 && (
                            <Button variant="outline" size="sm" onClick={() => removeHint(hint.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <Textarea
                          placeholder="Enter a helpful hint..."
                          value={hint.content}
                          onChange={(e) => updateHint(hint.id, e.target.value)}
                          rows={2}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge Preview</CardTitle>
                    <CardDescription>See how your challenge will appear to users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border bg-white p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                          {challenge.title || "Challenge Title"}
                        </h2>
                        <div className="flex items-center gap-2">
                          {challenge.difficulty && (
                            <Badge
                              variant={
                                challenge.difficulty === "easy"
                                  ? "secondary"
                                  : challenge.difficulty === "medium"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {challenge.difficulty.charAt(0).toUpperCase() +
                                challenge.difficulty.slice(1)}
                            </Badge>
                          )}
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {challenge.timeLimit} min
                          </div>
                        </div>
                      </div>

                      {challenge.description && (
                        <p className="mb-4 text-gray-600">{challenge.description}</p>
                      )}

                      {challenge.examples && (
                        <div className="mb-4">
                          <h3 className="mb-2 font-semibold">Problem Description</h3>
                          <div className="rounded-lg bg-gray-50 p-4">
                            <pre className="text-sm whitespace-pre-wrap">{challenge.examples}</pre>
                          </div>
                        </div>
                      )}

                      {challenge.constraints && (
                        <div className="mb-4">
                          <h3 className="mb-2 font-semibold">Constraints</h3>
                          <div className="rounded-lg bg-gray-50 p-4">
                            <pre className="text-sm whitespace-pre-wrap">
                              {challenge.constraints}
                            </pre>
                          </div>
                        </div>
                      )}

                      {testCases.some((tc) => !tc.isHidden && tc.input && tc.expectedOutput) && (
                        <div>
                          <h3 className="mb-2 font-semibold">Sample Test Cases</h3>
                          {testCases
                            .filter((tc) => !tc.isHidden && tc.input && tc.expectedOutput)
                            .map((tc) => (
                              <div key={tc.id} className="mb-2 rounded-lg bg-gray-50 p-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <strong>Input:</strong>
                                    <pre className="mt-1">{tc.input}</pre>
                                  </div>
                                  <div>
                                    <strong>Output:</strong>
                                    <pre className="mt-1">{tc.expectedOutput}</pre>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Challenge Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Challenge Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="outline">Draft</Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Test Cases</span>
                  <span>{testCases.length}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Hints</span>
                  <span>{hints.filter((h) => h.content.trim()).length}</span>
                </div>

                {challenge.difficulty && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Difficulty</span>
                    <Badge
                      variant={
                        challenge.difficulty === "easy"
                          ? "secondary"
                          : challenge.difficulty === "medium"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handlePublishChallenge}
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={!challenge.title || !challenge.examples || testCases.length === 0}
              >
                Publish Challenge
              </Button>

              <Button
                onClick={handleSaveChallenge}
                variant="outline"
                className="w-full bg-transparent"
              >
                Save Draft
              </Button>
            </div>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• Write clear, concise problem statements</p>
                <p>• Include multiple test cases with edge cases</p>
                <p>• Provide progressive hints that guide without giving away the solution</p>
                <p>• Set appropriate time limits based on complexity</p>
                <p>• Test your challenge thoroughly before publishing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
