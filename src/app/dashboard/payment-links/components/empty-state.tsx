"use client";

import React from "react";
import { Zap, ArrowRight, CheckCircle2, ShieldCheck, Link as LinkIcon } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export const EmptyState = ({ onCreateClick }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in duration-700">
      
      {/* 1. Visual Graphic Group */}
      <div className="relative mb-10">
        {/* Floating "Secure Protocol" Badge */}
        <div className="absolute -top-8 -right-12 bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-2xl">
          <div className="w-1.5 h-1.5 bg-[#14F195] rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Secure Protocol</span>
        </div>

        {/* Central Icon Stack */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Tilted Purple Square */}
          <div className="absolute inset-0 border-2 border-[#A855F7]/30 rounded-[2rem] rotate-12" />
          
          {/* Main Dark Square with Bolt */}
          <div className="relative w-24 h-24 bg-[#1A1A1C] border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl">
            <Zap size={40} className="text-[#14F195] fill-[#14F195]/20" />
          </div>
        </div>

        {/* Floating Link Snippet Badge */}
        <div className="absolute -bottom-6 -left-12 bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-2xl">
          <LinkIcon size={12} className="text-white/40" />
          <span className="text-[10px] font-mono text-white/40">payfi.link/tx_049x</span>
        </div>
      </div>

      {/* 2. Text Content */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
        No payment links yet
      </h2>
      <p className="text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
        Create your first shareable payment link and start accepting Solana or NGN globally in seconds. No complex integration required.
      </p>

      {/* 3. Primary Action Button */}
      <button 
        onClick={onCreateClick}
        className="group bg-[#A855F7] hover:bg-[#9333EA] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-[0_20px_40px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.25)] hover:-translate-y-1"
      >
        Launch your first product link
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
      </button>

      {/* 4. Trust Badges */}
      <div className="mt-16 flex flex-col sm:flex-row items-center gap-8 md:gap-12 opacity-40">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={18} className="text-[#14F195]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Instant Settlement</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle2 size={18} className="text-[#14F195]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Zero Hidden Fees</span>
        </div>
      </div>
    </div>
  );
};