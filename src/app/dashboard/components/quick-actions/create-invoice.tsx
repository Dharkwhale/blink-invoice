"use client";

import React from "react";
import { Plus, ArrowUpRight } from "lucide-react";

export const CreateInvoice = () => {
  return (
    <div className="relative h-full min-h-[180px] group cursor-pointer">
      {/* Animated Border Gradient */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-[#9945FF] via-transparent to-[#14F195] rounded-[24px] md:rounded-[32px] opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="relative h-full bg-[#0A0A0B] rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-primary/20">
            <Plus size={22} className="text-white" />
          </div>

          <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 tracking-tight">
            {"Create Quick Invoice"}
          </h3>
          <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
            {"Instantly generate a payment link or invoice for your global customers."}
          </p>
        </div>

        <div className="flex justify-end mt-4 md:mt-0">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/30 transition-all">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
