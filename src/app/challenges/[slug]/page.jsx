"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useChallenge } from "@/hooks/useChallenge";
import { useSubmitCode } from "@/hooks/useSubmitCode";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderChallenge from "../_components/HeaderChallenge";
import CodeEditor from "../_components/CodeEditor";
import JSPlayground from "../_components/JSPlayground";
import RenderInstruction from "../_components/RenderInstruction";
import LoadingScreen from "@/components/LoadingScreen";
import TestCaseResults from "../_components/TestCaseResults";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Star, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorite } from "@/hooks/useFavorite";
import { Spinner } from "@/components/Spinner";

export default function ChallengePage() {
  const { slug } = useParams();
  const { challenge, loading, submissionCode } = useChallenge(slug);
  const [code, setCode] = useState("// Write your code here");
  const [results, setResults] = useState([]);
  const [tab, setTab] = useState("output");
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  const {
    submitCode,
    isSubmitting,
    error: isSubmitError,
    response: submitResponse
  } = useSubmitCode();

  const {
    favorited: isFavorited,
    toggleFavorite: toggleIsFavorited,
    loading: favoritedLoading
  } = useFavorite(challenge?.id);

  const testResults = submitResponse?.submission?.test_results || results;
  const totalTests = testResults.length;
  const passedTests = testResults.filter((r) => r.passed).length;
  const score = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  const allPassed = totalTests > 0 && passedTests === totalTests;

  useEffect(() => {
    if (submissionCode) {
      setCode(submissionCode);
    } else if (challenge?.starter_code) {
      setCode(challenge.starter_code);
    }
  }, [challenge, submissionCode]);

  useEffect(() => {
    if (submitResponse && !isSubmitError) {
      setShowResultsPopup(true);
    }
  }, [submitResponse, isSubmitError]);

  const runTests = () => {
    setTab("result");
  };

  const submitCodeHandler = async () => {
    if (!challenge) return;
    await submitCode({ id: challenge.id, code });
  };

  const onTabChange = (value) => {
    setTab(value);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!challenge) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col">
      <HeaderChallenge
        challenge={challenge}
        run={runTests}
        onTabChange={onTabChange}
        submit={submitCodeHandler}
        isSubmitting={isSubmitting}
      />

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
              <Tabs value={tab} onValueChange={onTabChange} className="h-full py-2">
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
                  <TestCaseResults code={code} challenge={challenge} />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Modal */}
      <Dialog open={showResultsPopup} onOpenChange={setShowResultsPopup}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {allPassed ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <XCircle className="h-6 w-6 text-red-400" />
              )}
              <span className="text-foreground">
                {allPassed ? "Challenge Completed!" : "Challenge Failed"}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Score Display */}
            <div className="text-center">
              <div className="text-foreground mb-2 text-3xl font-bold">{score}%</div>
              <div className="text-muted-foreground text-sm">
                {passedTests} of {totalTests} tests passed
              </div>
            </div>

            {/* Test Results Summary */}
            <div className="space-y-2">
              <h4 className="text-foreground font-medium">Test Results:</h4>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded border p-2 ${
                    result.passed
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  <span className="text-sm">Test {index + 1}</span>
                  <div className="flex items-center space-x-1">
                    {result.passed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {result.passed ? "Passed" : "Failed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <Button
                variant="outline"
                className={`flex-1 hover:text-yellow-400 ${isFavorited ? "border-yellow-400/30 text-yellow-400" : ""} ${favoritedLoading ? "cursor-progress" : "cursor-pointer"} `}
                onClick={toggleIsFavorited}
                disabled={favoritedLoading}
              >
                {favoritedLoading ? (
                  <Spinner size="1rem" />
                ) : (
                  <>
                    <Star className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                    {isFavorited ? "Favorited" : "Add to Favorites"}
                  </>
                )}
              </Button>
              <Button className="flex-1" onClick={() => setShowResultsPopup(false)}>
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
