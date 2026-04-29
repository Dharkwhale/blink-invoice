"use client";

import React from "react";
import { Link2, Copy, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const BLINKS_DATA = [
  {
    id: "1",
    name: "Tech Gear Sale",
    url: "blink.sh/tech-gear-24",
    status: "PAID",
    amount: "4.5",
    naira: "465,000",
    time: "2 hours ago",
  },
  {
    id: "2",
    name: "Design Consultation",
    url: "blink.sh/consult-uiux",
    status: "PENDING",
    amount: "1.2",
    naira: "124,000",
    time: "5 hours ago",
  },
  {
    id: "3",
    name: "Subscription Renew",
    url: "blink.sh/sub-pro-01",
    status: "EXPIRED",
    amount: "0.8",
    naira: "82,500",
    time: "Yesterday",
  },
];

const STATUS_STYLES: Record<string, string> = {
  PAID: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  PENDING: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  EXPIRED: "bg-red-500/10 text-red-500 border-red-500/20",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={cn(
      "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border",
      STATUS_STYLES[status] || STATUS_STYLES.PENDING
    )}
  >
    {status}
  </span>
);

export const RecentBlinks = () => (
  <>
    {/* Mobile: card list */}
    <div className="md:hidden flex flex-col gap-3">
      {BLINKS_DATA.map((blink) => (
        <div
          key={blink.id}
          className="bg-[#121214]/50 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between gap-3"
        >
          {/* Left: icon + name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-primary">
              <Link2 size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{blink.name}</p>
              <p className="text-[11px] text-white/30 font-medium">{blink.time}</p>
            </div>
          </div>

          {/* Right: status + amount + actions */}
          <div className="flex items-center gap-3 shrink-0">
            <StatusBadge status={blink.status} />
            <div className="text-right hidden xs:block">
              <p className="text-sm font-bold text-white">{blink.amount} {"SOL"}</p>
              <p className="text-[10px] text-white/30">{"≈ ₦"}{blink.naira}</p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-all">
              <MoreVertical size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Desktop: table */}
    <div className="hidden md:block w-full overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">
            <th className="pb-2 pl-4">{"Payment Link"}</th>
            <th className="pb-2 text-center">{"Status"}</th>
            <th className="pb-2 text-center">{"Amount"}</th>
            <th className="pb-2 text-center">{"Time"}</th>
            <th className="pb-2 pr-4 text-right">{"Actions"}</th>
          </tr>
        </thead>
        <tbody>
          {BLINKS_DATA.map((blink) => (
            <tr
              key={blink.id}
              className="group bg-[#121214]/50 hover:bg-[#121214] transition-all"
            >
              <td className="py-4 pl-4 rounded-l-2xl border-y border-l border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    <Link2 size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-tight">{blink.name}</p>
                    <p className="text-[11px] text-white/30 font-medium">{blink.url}</p>
                  </div>
                </div>
              </td>

              <td className="py-4 text-center border-y border-white/5">
                <StatusBadge status={blink.status} />
              </td>

              <td className="py-4 text-center border-y border-white/5">
                <span className="text-sm font-bold text-white">{blink.amount} {"SOL"}</span>
                <br />
                <span className="text-[10px] text-white/30 font-medium">{"≈ ₦"}{blink.naira}</span>
              </td>

              <td className="py-4 text-center border-y border-white/5">
                <span className="text-xs text-white/40 font-medium">{blink.time}</span>
              </td>

              <td className="py-4 pr-4 text-right rounded-r-2xl border-y border-r border-white/5">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-all">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-all">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
