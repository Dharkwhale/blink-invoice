"use client";

import React from "react";
import { Search, Bell, HelpCircle, ChevronDown, Menu } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

const SearchBar = () => (
  <div className="relative w-full max-w-md group">
    <Search
      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors"
      size={16}
    />
    <input
      type="text"
      placeholder="Search transactions..."
      className="w-full bg-[#121214] border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
    />
  </div>
);

interface DashNavbarProps {
  onMenuClick: () => void;
}

export const DashNavbar = ({ onMenuClick }: DashNavbarProps) => {
  const { publicKey } = useWallet();
  const base58 = publicKey?.toBase58();
  const address = base58 ? `${base58.slice(0, 4)}..${base58.slice(-4)}` : "Connect";

  return (
    <nav className="h-16 md:h-20 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center gap-3 md:gap-6">

      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-1 -ml-1 text-white/50 hover:text-white transition-colors shrink-0"
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      {/* Search — hidden on mobile */}
      <div className="hidden sm:flex flex-1 min-w-0">
        <SearchBar />
      </div>

      {/* Nav tabs — xl+ only */}
      <div className="hidden xl:flex items-center gap-6 flex-1">
        {["Invoices", "Blinks", "Wallet Settings"].map((tab) => (
          <button
            key={tab}
            className="text-sm font-medium text-white/40 hover:text-white transition-colors relative py-2 shrink-0"
          >
            {tab}
            {tab === "Invoices" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-1 md:gap-3 ml-auto">
        {/* Mobile search icon */}
        <button className="sm:hidden p-2 text-white/40 hover:text-white transition-colors">
          <Search size={19} />
        </button>

        <button className="p-2 text-white/40 hover:text-white transition-colors">
          <Bell size={19} />
        </button>
        <button className="hidden sm:block p-2 text-white/40 hover:text-white transition-colors">
          <HelpCircle size={19} />
        </button>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-white/10 shrink-0">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-bold text-white tracking-tight">{address}</span>
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
            {"Pro Merchant"}
          </span>
        </div>
        <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/avatar-placeholder.png"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <ChevronDown size={14} className="hidden sm:block text-white/30" />
      </div>
    </nav>
  );
};
