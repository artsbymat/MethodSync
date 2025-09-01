"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle } from "lucide-react";
import HeaderChallenge from "../_components/HeaderChallenge";
import CodeEditor from "../_components/CodeEditor";
import JSPlayground from "../_components/JSPlayground";
import RenderInstruction from "../_components/RenderInstruction";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { useChallenge } from "@/hooks/useChallenge";
import { extractFunctionName } from "@/lib/utils";

export default function ChallengePage() {
  const { slug } = useParams();
  const router = useRouter();
  const { challenge, loading } = useChallenge(slug);
  const [code, setCode] = useState("// Write your code here");
  const workerRef = useRef(null);
  const [testCases, setTestCases] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (challenge?.starter_code) {
      setCode(challenge.starter_code);
    }
    if (challenge?.test_cases) {
      setTestCases(challenge.test_cases);
    }
  }, [challenge]);

  useEffect(() => {
    const workerScript = `
      self.onmessage = (event) => {
        const { code, input, expected, id, functionName } = event.data;
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(String).join(" "));
          originalLog(...args);
        };

        try {
          let fn;
          let userCode = code.trim();

          if (functionName) {
            // bungkus code + return functionName
            fn = new Function(userCode + "; return " + functionName + ";")();
          } else {
            // fallback kalau tidak ada function name
            fn = new Function("return " + userCode)();
          }

          if (typeof fn !== "function") {
            throw new Error("Tidak ditemukan function utama");
          }

          const result = fn(...input);

          self.postMessage({
            id,
            passed: result === expected,
            input,
            expected,
            actual: result,
            logs,
          });
        } catch (err) {
          self.postMessage({
            id,
            passed: false,
            input,
            expected,
            actual: undefined,
            error: err.message,
            logs,
          });
        }
      };
    `;
    const blob = new Blob([workerScript], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;

    worker.onmessage = (event) => {
      setResults((prev) => [...prev, event.data]);
    };

    return () => worker.terminate();
  }, []);

  const runTests = () => {
    setResults([]);
    testCases.forEach((t, i) => {
      workerRef.current.postMessage({
        code,
        input: t.input,
        expected: t.output,
        id: i,
        functionName: extractFunctionName(challenge?.starter_code)
      });
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (challenge) {
    return (
      <div className="flex h-screen flex-col">
        <HeaderChallenge challenge={challenge} run={runTests} />

        {/* Main Content */}
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-64px)] w-full border">
          <ResizablePanel defaultSize={50}>
            <div className="bg-card border-border h-full overflow-auto border-r">
              <div className="p-6">
                <h2 className="text-foreground mb-4 text-2xl font-bold">Instruction</h2>
                <RenderInstruction content={challenge.instruction} />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <div className="flex h-full flex-col">
                  <CodeEditor code={code} setCode={setCode} />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                {/* Output Section */}
                <Tabs defaultValue="output" className="h-full py-2">
                  <TabsList className="w-full rounded-none">
                    <TabsTrigger value="output" className="cursor-pointer rounded">
                      Console Output
                    </TabsTrigger>
                    <TabsTrigger value="result" className="cursor-pointer rounded">
                      Test Result
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="output" className="no-scrollbar h-full overflow-y-auto">
                    <JSPlayground code={code} />
                  </TabsContent>
                  <TabsContent value="result" className="no-scrollbar h-full overflow-y-auto">
                    {/* Test Results */}
                    {results.length > 0 && (
                      <div className="m-2 space-y-2">
                        {results.map((result, index) => (
                          <div
                            key={index}
                            className={`rounded-lg border p-3 ${
                              result.passed
                                ? "border-green-500/30 bg-green-500/10"
                                : "border-red-500/30 bg-red-500/10"
                            }`}
                          >
                            <div className="mb-1 flex items-center space-x-2">
                              {result.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-400" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-400" />
                              )}
                              <span className="text-sm font-medium">
                                Test {index + 1}: {result.passed ? "Passed" : "Failed"}
                              </span>
                            </div>
                            <div className="text-muted-foreground space-y-1 text-xs">
                              <div>Input: {JSON.stringify(result.input)}</div>
                              <div>Expected: {JSON.stringify(result.expected)}</div>
                              <div>Got: {JSON.stringify(result.actual)}</div>
                              {result.error && <div>Error: {result.error}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
        <h2 className="text-foreground text-2xl font-bold">Challenge Not Found</h2>
        <Button
          onClick={() => router.push("/challenges")}
          className="bg-primary hover:bg-primary/90 cursor-pointer rounded px-4 py-2 text-white"
        >
          Back to Challenges
        </Button>
      </div>
    );
  }
}
