"use client";

import React from "react";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { Zap } from "lucide-react";

export const Hero = () => {
  const { connected } = useWallet();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full pt-28 sm:pt-36 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-black mt-0">

      {/* Gradients */}
      <div className="absolute top-20 left-0 w-500px h-500px bg-primary/20 blur-[130px] rounded-full pointer-events-none opacity-80" />
      <div className="absolute bottom-12 right-0 w-100 h-100 bg-secondary/15 blur-[120px] rounded-full pointer-events-none opacity-90" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left Column */}
          <div className="max-w-xl flex flex-col items-start gap-7 md:gap-10">

            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 md:gap-2.5 bg-[#1A1A1E] border border-white/10 px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-inner">
              <Zap className="text-secondary animate-pulse" size={14} />
              <span className="text-[11px] md:text-[13px] font-semibold uppercase tracking-widest text-secondary">
                {"Live on Solana Mainnet"}
              </span>
            </div>

            {/* Fluid headline — scales smoothly from 46px (mobile) to 84px (desktop) */}
            <h1 className="text-[clamp(2.875rem,5vw+1.5rem,5.25rem)] font-extrabold tracking-tightest leading-[0.92] text-white">
              {"Get Paid in"}<br />
              <span className="text-primary italic font-bold">{"Seconds"}</span>{", Not "}<br />
              {"Days."}
            </h1>

            <p className="text-muted text-base md:text-xl leading-relaxed max-w-lg">
              {"The simplest way for African freelancers to send professional Solana invoices that get paid directly inside WhatsApp and Twitter."}
            </p>

            {/* CTA Bar */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              {!mounted ? (
                <div className="w-[180px] h-12 md:h-14 bg-white/5 animate-pulse rounded-2xl border border-white/5" />
              ) : !connected ? (
                <WalletMultiButton className="!bg-primary !h-12 md:!h-14 !px-8 md:!px-10 !text-sm md:!text-base !font-bold !rounded-2xl transition-all shadow-lg shadow-primary/20 hover:!opacity-95">
                  {"Connect Wallet"}
                </WalletMultiButton>
              ) : (
                <Link
                  href="/dashboard"
                  className="bg-primary text-black px-8 py-3 md:py-4 rounded-xl font-bold inline-flex items-center justify-center hover:bg-primary/90 transition-colors text-sm md:text-base"
                >
                  {"Enter Dashboard"}
                </Link>
              )}

              {/* Wallet Icons */}
              <div className="flex items-center gap-2.5">
                {["/phantomLogo.svg", "/backpackLogo.svg", "/solflareLogo.svg"].map((icon, index) => (
                  <div key={index} className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center transition-transform hover:scale-110">
                    <Image
                      src={icon}
                      alt="Wallet provider"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Bar */}
            <div className="w-full flex items-center gap-4 pt-5 md:pt-6 border-t border-white/5">
              <div className="flex items-center">
                <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-2xl overflow-hidden border-2 border-black z-10 bg-[#D9D9D9]">
                  <Image src="/trusted1.svg" alt="Creator 1" fill className="object-cover" />
                </div>
                <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-2xl overflow-hidden border-2 border-black z-20 -ml-3 md:-ml-4 bg-[#F7931A]">
                  <Image src="/trusted2.svg" alt="Creator 2" fill className="object-cover" />
                </div>
              </div>
              <span className="text-[12px] md:text-[14px] font-medium text-white/50 tracking-tight">
                {"Trusted by 500+ Nigerian Creators"}
              </span>
            </div>
          </div>

          {/* Right Column: Phone Mockup */}
          <div className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] lg:h-[700px] flex justify-center lg:justify-end items-center lg:pl-12">

            {/* Green Glow */}
            <div className="absolute bottom-[-5%] left-[25%] w-[200px] h-[200px] md:w-[250px] md:h-[250px] bg-secondary/20 blur-[80px] rounded-full pointer-events-none opacity-100" />

            {/* Phone Container — fluid width */}
            <div className="relative w-[240px] sm:w-[285px] md:w-[330px] lg:w-[380px] aspect-[9/18.8] group">

              {/* Device Frame */}
              <div className="absolute inset-0 rounded-[54px] p-[10px] bg-[#1A1A1E] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_30px_60px_-15px_rgba(0,0,0,0.9)] border border-white/10">
                {/* Inner Screen */}
                <div className="relative w-full h-full rounded-[44px] overflow-hidden border border-white/5 bg-black">
                  <Image
                    src="/Hmobile.png"
                    alt="Phone Mockup"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating Toast — scales with phone */}
              <div className="absolute -top-4 -right-4 sm:-right-8 md:-right-12 lg:-right-14 w-[150px] sm:w-[185px] md:w-[215px] lg:w-[240px] z-30 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2 group-hover:translate-x-2">
                <Image
                  src="/Hfloat.png"
                  alt="Payment Received"
                  width={240}
                  height={90}
                  className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




