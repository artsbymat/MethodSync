"use client";

import { useEffect, useState, useCallback, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Send, Clock } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import RenderMarkdown from "@/components/RenderMarkdown";
import RenderCodeEditor from "@/components/RenderCodeEditor";
import "highlight.js/styles/base16/ia-light.css";
import IFramePlayground from "@/components/IFremePlayground";

interface Challenge {
  title: string;
  difficulty: string;
  description: string;
  estimated_time: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test_cases: Array<{ input: any; expected: any }>;
  starter_code: string;
}

type TestResult = string;

type MessageHandler = (event: MessageEvent) => void;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ChallengePage() {
  const params = useParams<{ challengeSlug: string }>();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPending, startTransition] = useTransition();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("output");
  const messageHandlerRef = useRef<MessageHandler | null>(null);

  // Fetch challenge data
  const fetchChallenge = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/challenges/js/${slug}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch challenge data");
      }

      const data: Challenge = await response.json();
      setChallenge(data);
      setCode(data.starter_code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage: MessageHandler = (event: MessageEvent) => {
      if (event.data.type === "playground-test-result") {
        setTestResults(event.data.payload);
      }
      if (event.data.type === "playground-result") {
        setOutput(event.data.payload);
      }
    };

    messageHandlerRef.current = handleMessage;

    const handler = (event: MessageEvent) => {
      messageHandlerRef.current?.(event);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    if (params.challengeSlug) {
      fetchChallenge(params.challengeSlug as string);
    }
  }, [params.challengeSlug, fetchChallenge]);

  useEffect(() => {
    if (!code || !challenge) return;

    const timeout = setTimeout(() => {
      startTransition(() => {
        iframeRef.current?.contentWindow?.postMessage({ type: "run", code }, "*");
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [code, challenge]);

  // Run tests function
  const runTests = useCallback(() => {
    if (!challenge || !iframeRef.current) return;
    const getfunctionName = () => {
      const match = challenge?.starter_code.match(/function\s+(\w+)/);
      return match ? match[1] : "userFunction";
    };

    iframeRef.current.contentWindow?.postMessage(
      {
        type: "run-tests",
        code,
        testCases: challenge.test_cases,
        functionName: getfunctionName()
      },
      "*"
    );
  }, [code, challenge]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !challenge) {
    return <div className="p-6 text-red-500">Error: {error ?? "Challenge not found."}</div>;
  }

  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col bg-gray-50">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">{challenge.title}</h1>
          <Badge
            className={cn(
              "text-sm font-medium",
              challenge.difficulty === "Easy"
                ? "bg-green-100 text-green-800"
                : challenge.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            )}
            variant="secondary"
          >
            {challenge.difficulty}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>Estimated Time: {challenge.estimated_time} Minutes</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Challenge Description */}
          <ResizablePanel defaultSize={50} minSize={30} className="flex min-w-[300px] flex-col">
            <div className="flex h-full flex-col overflow-hidden border-r bg-white">
              <div className="shrink-0 border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Problem Description</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <RenderMarkdown>{challenge.description}</RenderMarkdown>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1" />

          {/* Right Panel - Editor & Output */}
          <ResizablePanel defaultSize={50} minSize={30} className="min-w-[300px]">
            <ResizablePanelGroup direction="vertical">
              {/* Code Editor */}
              <ResizablePanel defaultSize={70} minSize={30}>
                <RenderCodeEditor code={code} setCode={setCode} />
              </ResizablePanel>

              <ResizableHandle className="h-1" />

              {/* Output Section */}
              <ResizablePanel defaultSize={30} minSize={20} className="min-h-[150px]">
                <div className="flex h-full flex-col overflow-hidden bg-white">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="flex h-full flex-col overflow-auto"
                  >
                    <TabsList className="grid w-full shrink-0 grid-cols-2 rounded-none bg-gray-100">
                      <TabsTrigger value="output">Output</TabsTrigger>
                      <TabsTrigger value="tests">Test Results</TabsTrigger>
                    </TabsList>

                    <TabsContent value="output" className="m-0 flex-1 overflow-hidden">
                      <div className="h-full overflow-y-auto bg-gray-50 p-4 font-mono text-sm">
                        <pre className={`whitespace-pre-wrap ${isPending ? "opacity-50" : ""}`}>
                          {output || "Click 'Run Tests' to see output..."}
                        </pre>
                      </div>
                    </TabsContent>

                    <IFramePlayground ref={iframeRef} />

                    <TabsContent value="tests" className="m-0 flex-1 overflow-hidden">
                      <div className="h-full overflow-y-auto p-4">
                        {testResults.map((res, i) => (
                          <li
                            key={i}
                            className={res.startsWith("✅") ? "text-green-600" : "text-red-600"}
                          >
                            {res}
                          </li>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Action Buttons */}
                  <div className="flex shrink-0 gap-3 border-t bg-white p-4">
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => {
                        setActiveTab("tests");
                        runTests();
                      }}
                      disabled={isPending}
                    >
                      <Play className="h-4 w-4" />
                      {isPending ? "Running..." : "Run Tests"}
                    </Button>
                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
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
    </div>
  );
}
