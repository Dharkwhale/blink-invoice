"use client";

import React from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export const RevenueCard = () => {
  const solBalance = "120.5";
  const nairaEquivalent = "12,450,000";
  const percentageGrowth = "+12.4%";

  return (
    <div className="bg-[#0A0A0B] border border-white/5 rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 h-full flex flex-col justify-between group transition-all hover:border-white/10">
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-white/40 text-xs md:text-sm font-medium mb-3 md:mb-4 tracking-tight">
            {"Total Revenue"}
          </p>
          <div className="flex items-baseline gap-2 md:gap-3">
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none">
              {solBalance}
              <span className="ml-1.5 md:ml-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                {"SOL"}
              </span>
            </h1>
          </div>
        </div>

        {/* Growth Badge */}
        <div className="flex items-center gap-1.5 bg-[#14F195]/10 border border-[#14F195]/20 px-2.5 md:px-3 py-1.5 rounded-full shrink-0">
          <TrendingUp size={12} className="text-[#14F195]" />
          <span className="text-[#14F195] text-[11px] md:text-[12px] font-bold whitespace-nowrap">
            {percentageGrowth}{" "}
            <span className="text-white/40 font-normal hidden sm:inline">{"vs last month"}</span>
          </span>
        </div>
      </div>

      <div className="mt-5 md:mt-8">
        <div className="flex items-center gap-2 mb-5 md:mb-8 flex-wrap">
          <span className="text-white/20 text-lg md:text-xl font-medium">{"≈"}</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#14F195] tracking-tight">
            {"₦"}{nairaEquivalent}
          </h2>
          <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-0.5">
            {"NGN Conversion"}
          </span>
        </div>

        <button className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white/80 text-xs md:text-sm font-bold transition-all active:scale-95">
          {"View Detailed Analytics"}
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
};
