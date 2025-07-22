import { Faq } from "@/components/Faq";
import { Feature } from "@/components/Feature";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="mt-14 flex min-h-screen w-full flex-col items-center justify-center p-6 md:p-10">
      <Hero />
      <Feature />
      <Faq />
      <Testimonials />
    </div>
  );
}
