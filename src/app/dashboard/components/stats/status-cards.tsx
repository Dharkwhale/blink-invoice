"use client";

import React from "react";
import { Hourglass, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Sub-component to keep parent complexity low
interface StatusCardProps {
  label: string;
  amount: string;
  naira: string;
  icon: React.ElementType;
  iconColor: string;
  chartColor: string;
  isSettled?: boolean;
}

const StatCard = ({ label, amount, naira, icon: Icon, iconColor, chartColor, isSettled }: StatusCardProps) => (
  <div className="bg-[#121214] border border-white/5 rounded-[24px] p-6 flex items-center justify-between group hover:border-white/10 transition-all">
    <div className="flex items-center gap-5">
      {/* Icon Container */}
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5", iconColor)}>
        <Icon size={24} />
      </div>
      
      {/* Text Data */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-1">
          {label}
        </p>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {amount} <span className="text-white/40 text-lg font-medium">{"SOL"}</span>
        </h3>
        <p className="text-xs font-medium text-[#14F195]/60 mt-0.5">
          {"≈ ₦"}{naira}
        </p>
      </div>
    </div>

    {/* Mini Trend Visuals */}
    <div className="pr-2">
      {isSettled ? (
        // Settled: Simple Sparkline path
        <svg width="80" height="30" viewBox="0 0 80 30" fill="none" className="opacity-50 group-hover:opacity-100 transition-opacity">
          <path d="M2 25L15 20L28 28L45 15L60 22L78 5" stroke="#14F195" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        // Pending: Vertical Bar indicators
        <div className="flex items-end gap-1.5 h-10 opacity-30 group-hover:opacity-60 transition-opacity">
          {[40, 60, 45, 90, 70].map((h, i) => (
            <div key={i} className="w-1.5 bg-primary rounded-full" style={{ height: `${h}%` }} />
          ))}
        </div>
      )}
    </div>
  </div>
);

export const StatusCards = () => {
  return (
    <>
      {/* Pending Card */}
      <StatCard 
        label="Pending"
        amount="14.2"
        naira="1,460,000"
        icon={Hourglass}
        iconColor="text-[#9945FF]"
        chartColor="bg-primary"
      />

      {/* Settled Card */}
      <StatCard 
        label="Settled"
        amount="106.3"
        naira="10,990,000"
        icon={CheckCircle2}
        iconColor="text-[#14F195]"
        chartColor="bg-[#14F195]"
        isSettled
      />
    </>
  );
};