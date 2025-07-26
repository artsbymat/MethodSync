"use client";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

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
              <Button>
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
