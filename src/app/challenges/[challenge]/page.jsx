"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { challenge } from "@/utils/dummy-data";
import { CheckCircle, XCircle } from "lucide-react";
import { testResults } from "@/utils/dummy-data";
import { useState } from "react";

import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import JSPlayground from "@/components/JSPlayground";

export default function ChallengePage() {
  const [code, setCode] = useState("// Write your code here");

  return (
    <div className="flex h-screen flex-col">
      <Header challenge={challenge} />

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-64px)] w-full border">
        <ResizablePanel defaultSize={50}>
          <div className="bg-card border-border h-full overflow-auto border-r">
            <div className="p-6">
              <h2 className="text-foreground mb-4 text-2xl font-bold">Problem Description</h2>
              <p className="text-muted-foreground mb-6">{challenge.description}</p>
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
                  {testResults.length > 0 && (
                    <div className="m-2 space-y-2">
                      {testResults.map((result, index) => (
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
                            <div>Input: {result.input}</div>
                            <div>Expected: {result.expected}</div>
                            <div>Got: {result.actual}</div>
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
}
