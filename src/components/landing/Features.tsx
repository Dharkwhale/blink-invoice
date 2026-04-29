"use client";

import React from "react";
import { Edit3, Share2, Wallet } from "lucide-react";

export const Features = () => {
  const steps = [
    {
      id: "1",
      title: "Create",
      description: "Input your service details and price. Our platform generates a unique Solana Blink link in under 15 seconds. No complex forms.",
      icon: <Edit3 className="text-primary" size={22} />,
      bg: "bg-primary/10",
    },
    {
      id: "2",
      title: "Share",
      description: "Paste the link into WhatsApp, Twitter, or Discord. It unfurls into a native payment card where clients pay securely without leaving their feed.",
      icon: <Share2 className="text-secondary" size={22} />,
      bg: "bg-secondary/10",
    },
    {
      id: "3",
      title: "Withdraw",
      description: "Payments settle instantly. Off-ramp directly to your Nigerian bank account or keep it in USDC to hedge against inflation.",
      icon: <Wallet className="text-[#00FFA3]" size={22} />,
      bg: "bg-[#00FFA3]/10",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-[#0F0F11] overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-[34px] sm:text-4xl md:text-5xl font-extrabold tracking-tightest leading-tight mb-4 md:mb-6 text-white">
            {"The Outcome-First Approach"}
          </h2>
          <p className="text-muted text-base md:text-xl leading-relaxed opacity-80">
            {"We stripped away the complexity of traditional banking. 3 steps, zero headaches."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group p-6 sm:p-8 md:p-10 rounded-[24px] md:rounded-[32px] bg-[#121214] border border-white/5 hover:border-white/10 transition-all duration-300 shadow-2xl"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${step.bg} rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                {step.id}{". "}{step.title}
              </h3>

              <p className="text-muted leading-relaxed text-sm md:text-base opacity-80">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
