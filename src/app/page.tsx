import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ExchangeInfo } from "@/components/landing/ExchangeInfo";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    // Ensure bg-black or bg-[#000000] is consistent across the stack
    <main className="relative bg-black min-h-screen">
      <Navbar />
      
      {/* Call the components directly. 
         The Hero should handle its own top padding (e.g., pt-24) 
         to clear the fixed Navbar.
      */}
      <Hero />
      <Features />
      <ExchangeInfo />
      <Footer />
      
      {/* Future sections like Pricing or FAQ would go here */}
    </main>
  );
}