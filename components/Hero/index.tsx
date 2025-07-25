"use client";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const testCreateChallenge = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/grader/js/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Double the Number",
        slug: "double-the-number",
        description: "Create a function that takes a number and returns double the value.",
        difficulty: "easy",
        category: "math",
        hints: ["Gunakan operator perkalian.", "Pastikan input berupa angka."],
        starter_code: "function doubleNumber(n) {\n  // your code here\n}",
        test_cases: [
          { input: 2, expectedOutput: 4 },
          { input: 3, expectedOutput: 6 },
          { input: 4, expectedOutput: 8 }
        ],
        estimated_time: 15,
        is_published: true
      })
    });

    console.log("Response status:", response);
    if (!response.ok) {
      throw new Error("Failed to create challenge");
    }

    const data = await response.json();
    console.log("Challenge created:", data);
  } catch (error) {
    console.error("Error creating challenge:", error);
  }
};

const Hero = () => {
  return (
    <section>
      <div className="container">
        <div className="bg-muted-2 grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              Welcome to Our Website
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              Discover a world of coding challenges designed to enhance your skills and take your
              programming to the next level.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button onClick={testCreateChallenge}>
                Get Started
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline">
                Learn More
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
          <Image
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder hero"
            className="h-full w-full object-cover"
            width={600}
            height={400}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
