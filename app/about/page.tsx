"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const defaultCompanies = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc"
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript"
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury"
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp"
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool"
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed"
  }
];

const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" }
];

const AboutPage = () => {
  const title = "About Us";
  const description =
    "Shadcnblocks is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.";

  const mainImage = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "placeholder"
  };

  const secondaryImage = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    alt: "placeholder"
  };

  const breakout = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "Hundreds of blocks at Shadcnblocks.com",
    description:
      "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    buttonText: "Discover more",
    buttonUrl: "https://shadcnblocks.com"
  };

  const companiesTitle = "Valued by clients worldwide";
  const achievementsTitle = "Our Achievements in Numbers";
  const achievementsDescription =
    "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.";

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
            width={600}
            height={400}
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="bg-muted flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto">
              <Image
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12"
                width={48}
                height={48}
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank" rel="noopener noreferrer">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
              width={600}
              height={400}
            />
          </div>
        </div>

        <div className="py-32">
          <p className="text-center">{companiesTitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {defaultCompanies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <Image
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8"
                  width={100}
                  height={50}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted relative overflow-hidden rounded-xl p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold">{achievementsTitle}</h2>
            <p className="text-muted-foreground max-w-xl">{achievementsDescription}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {defaultAchievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p>{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] bg-[size:80px_80px] opacity-15 md:block"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
