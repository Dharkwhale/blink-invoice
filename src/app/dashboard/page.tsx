"use client";

import React from "react";
// Import the components from your new folder structure
import { RevenueCard } from "./components/stats/revenue-card";
import { StatusCards } from "./components/stats/status-cards";
import { CreateInvoice } from "./components/quick-actions/create-invoice";
import { RecentBlinks } from "./components/tables/recent-blinks";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Row: Revenue & Quick Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueCard />
        </div>
        <div className="lg:col-span-1">
          <CreateInvoice />
        </div>
      </div>

      {/* Middle Row: Pending & Settled Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusCards />
      </div>

      {/* Bottom Row: Recent Transactions */}
      <div className="bg-[#0A0A0B] border border-white/5 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {"Recent Blinks"}
          </h2>
          <button className="text-primary text-xs sm:text-sm font-semibold hover:underline">
            {"View All Blinks"}
          </button>
        </div>
        <RecentBlinks />
      </div>
      
    </div>
  );
}

// "use client";

// export default function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <h1 className="text-white text-5xl font-bold">ROUTE CONNECTED ✅</h1>
//     </div>
//   );
// }