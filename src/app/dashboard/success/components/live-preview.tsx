"use client";

import React from "react";
import { Check } from "lucide-react";

interface LivePreviewProps {
  merchantName: string;
  amountSol: string;
  amountNgn: string;
  type: "invoice" | "payment-link";
  description: string;
  image?: string; // Add this
}

export const LivePreview = ({ 
  merchantName, 
  amountSol, 
  amountNgn, 
  type, 
  description,
  image 
}: LivePreviewProps) => {
  return (
    <div className="relative flex justify-center group">
      {/* ... Settlement Badge remains the same ... */}
      <div className="absolute top-1/2 -right-6 z-10 bg-[#1A1A1C] border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
        <div className="w-2 h-2 bg-[#14F195] rounded-full animate-pulse" />
        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Settlement Ready</span>
      </div>

      {/* The Phone Frame */}
      <div className="relative w-[300px] h-[600px] bg-[#000000] border-[8px] border-[#1A1A1C] rounded-[3.5rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden p-4 flex flex-col items-center">
        <div className="w-20 h-5 bg-[#1A1A1C] rounded-b-2xl mb-8 flex items-center justify-center">
          <div className="w-8 h-1 bg-white/5 rounded-full" />
        </div>
        
        <div className="w-full mt-4 flex flex-col items-center">
          
          {/* Main Logo/Icon - UPDATED LOGIC HERE */}
          <div className="w-14 h-14 bg-[#A855F7] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 overflow-hidden border border-white/10">
            {image ? (
              <img src={image} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Check size={28} className="text-white" />
            )}
          </div>

          <div className="w-full bg-[#111113] rounded-[2.5rem] p-6 text-center border border-white/5 shadow-2xl">
            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">
              {type === "invoice" ? "Paying Merchant" : "Product Storefront"}
            </p>
            <h3 className="text-lg font-bold text-white mb-8 truncate px-2 capitalize">
              {merchantName}
            </h3>
            
            <div className="bg-black/40 rounded-3xl py-8 mb-4 border border-white/[0.02]">
              <p className="text-3xl font-bold text-white leading-none mb-2 tracking-tighter">
                {amountSol} SOL
              </p>
              <p className="text-xs text-[#14F195] font-bold">
                ≈ {amountNgn}
              </p>
            </div>

            <div className="mt-4 mb-8 px-2 text-center">
               <p className="text-[10px] text-white/50 leading-relaxed italic line-clamp-2">
                 {description}
               </p>
            </div>

            <button className="w-full bg-[#A855F7]/10 border border-[#A855F7]/30 text-[#A855F7] py-4 rounded-2xl font-bold text-[11px] mb-6">
              PAY WITH PHANTOM
            </button>
            
            <div className="flex flex-col items-center gap-2 opacity-20">
               <div className="h-[1px] w-12 bg-white/50" />
               <p className="text-[8px] text-white font-bold uppercase tracking-[0.3em]">Verified Blink • Solana L1</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 w-28 h-1 bg-white/10 rounded-full" />
      </div>
    </div>
  );
};