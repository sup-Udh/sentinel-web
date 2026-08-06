import { Hero } from "@/components/sections/Hero";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Features } from "@/components/sections/Features";
import { Timeline } from "@/components/sections/Timeline";
import { Download } from "@/components/sections/Download";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveDemo />
      <Features />
      <Timeline />
      <Download />
      <FAQ />
    </>
  );
}
