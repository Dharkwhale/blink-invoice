"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Lock, Zap as ZapIcon } from "lucide-react";

export const ExchangeInfo = () => {
  const bulletPoints = [
    "Real-time exchange rate calculation",
    "Auto-conversion to USDC option",
    "Zero-fee internal transfers",
  ];

  const securityFeatures = [
    {
      icon: <ShieldCheck className="text-secondary" size={24} />,
      title: "Native Wallet Security",
      description: "Customers never 'connect' to a website. Payments are handled natively inside their trusted wallet extension.",
    },
    {
      icon: <Lock className="text-secondary" size={24} />,
      title: "Transaction Simulation",
      description: "Wallets simulate the payment before it happens, showing exactly what is leaving the wallet. No hidden 'drainers'.",
    },
    {
      icon: <ZapIcon className="text-secondary" size={24} />,
      title: "Powered by Solana Blinks",
      description: "Official Solana Actions standard. Verifiable transaction cards that work directly on social media feeds.",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-[#000000] overflow-hidden">

      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* --- PART 1: Know your Earnings --- */}
        <div className="p-6 sm:p-10 md:p-16 rounded-[32px] md:rounded-[48px] bg-[#0F0F11] border border-white/5 shadow-2xl mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left Column */}
            <div className="max-w-xl flex flex-col items-start gap-7 md:gap-10">
              <h2 className="text-[34px] sm:text-4xl md:text-5xl font-extrabold tracking-tightest leading-[1.05] text-white">
                {"Know exactly what"} <br />
                {"you're earning."}
              </h2>

              <p className="text-muted text-base md:text-lg leading-relaxed max-w-lg opacity-80">
                {"Fluctuating rates shouldn't be your problem. BlinkInvoice automatically displays real-time NGN equivalents so you and your clients are always on the same page."}
              </p>

              <div className="w-full flex flex-col gap-4 md:gap-6 pt-4 border-t border-white/5">
                {bulletPoints.map((point) => (
                  <div key={point} className="inline-flex items-center gap-3 md:gap-4">
                    <CheckCircle2 className="text-secondary shrink-0" size={18} />
                    <p className="text-[15px] md:text-[17px] font-medium text-white/90">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="relative w-full aspect-[11/7]">
              <Image
                src="/BLogo.svg"
                alt="Active Invoice Graphic"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* --- PART 2: Security Section --- */}
        <div className="mb-20 md:mb-32">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-[28px] sm:text-3xl md:text-5xl font-extrabold tracking-tightest text-white mb-4 md:mb-6">
              {"Trust is built into the protocol."}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-[#0F0F11] border border-white/5 flex flex-col items-start gap-4 md:gap-5"
              >
                <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-secondary/10">
                  {feature.icon}
                </div>
                <h3 className="text-[17px] md:text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed opacity-70 text-[13px] md:text-[15px]">
                  {`"${feature.description}"`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- PART 3: Final CTA --- */}
        <div className="py-10 md:py-16">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-7 md:gap-10">

            {/* Fluid headline — scales from 46px to 72px */}
            <h2 className="text-[clamp(2.875rem,3.5vw+1.5rem,4.5rem)] font-extrabold tracking-tightest leading-[0.95] text-white">
              {"Start getting paid like a"} <br />
              {"global pro today."}
            </h2>

            <p className="text-muted text-base md:text-xl leading-relaxed max-w-2xl opacity-80">
              {"Join 500+ Nigerian creators who have switched to the future of invoicing. No monthly fees, no hidden costs."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4 md:pt-6 w-full sm:w-auto">
              <Link
                href="/get-started"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-primary text-white h-12 md:h-14 px-10 md:px-12 text-sm md:text-base font-bold rounded-2xl hover:scale-[1.03] transition-transform shadow-lg shadow-primary/20"
              >
                {"Get Started Free"}
              </Link>

              <Link
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 text-sm md:text-base font-medium rounded-2xl border border-white/10 text-white/80 hover:bg-white/5 transition-colors"
              >
                {"View Demo"}
              </Link>
            </div>

            <p className="text-[12px] md:text-sm font-medium text-white/40 pt-2 tracking-tight">
              {"Requires a Solana compatible wallet (Phantom, Solflare, etc.)"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
