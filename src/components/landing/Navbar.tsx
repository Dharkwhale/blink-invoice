"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connected } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 md:w-10 md:h-10 relative">
            <Image src="/BLogo.svg" alt="Logo" width={40} height={40} priority />
          </div>
          <span className="text-[1.0625rem] md:text-2xl font-bold tracking-tightest text-white">
            {"BlinkInvoice"}
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 mr-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop wallet actions */}
        <div className="hidden md:flex items-center gap-4">
          {connected && (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary font-bold text-sm hover:text-primary/80 transition-colors"
            >
              <LayoutDashboard size={18} /> {"Dashboard"}
            </Link>
          )}
          <WalletMultiButton className="!bg-primary !h-11 !px-6 !font-bold !rounded-xl" />
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden relative w-7 h-7 flex items-center justify-center text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <X
            size={24}
            className={`absolute transition-all duration-200 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
          />
          <Menu
            size={24}
            className={`absolute transition-all duration-200 ${isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
          />
        </button>
      </div>

      {/* Mobile menu — smooth slide-down */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0A0A0B]/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex flex-col">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="text-[15px] font-medium text-white/70 hover:text-white transition-colors py-3.5 border-b border-white/5 last:border-0"
            >
              {label}
            </Link>
          ))}

          <div className="pt-5 flex flex-col gap-3">
            {connected && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:text-primary/80 transition-colors py-1"
              >
                <LayoutDashboard size={18} /> {"Dashboard"}
              </Link>
            )}
            <WalletMultiButton className="!bg-primary !h-11 !px-6 !font-bold !rounded-xl" />
          </div>
        </div>
      </div>
    </nav>
  );
};
