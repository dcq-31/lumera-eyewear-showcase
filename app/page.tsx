import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Features } from "@/components/sections/Features";
import { Specs } from "@/components/sections/Specs";
import { Variants } from "@/components/sections/Variants";
import { PreOrder } from "@/components/sections/PreOrder";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Showcase />
      <Features />
      <Specs />
      <Variants />
      <PreOrder />
      <Footer />
    </main>
  );
}
