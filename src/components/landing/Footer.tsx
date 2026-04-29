"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-[#000000] border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6">

          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 relative flex items-center">
              <Image
                src="/BLogo.svg"
                alt="BlinkInvoice Logo"
                width={36}
                height={36}
                priority
                className="object-contain w-full h-auto"
              />
            </div>
            <span className="text-[1rem] md:text-xl font-bold text-white tracking-tightest">
              {"BlinkInvoice"}
            </span>
          </div>

          {/* Links — wrap gracefully on narrow screens */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[12px] md:text-[14px] font-medium text-white/70">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {"Privacy Policy"}
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {"Terms of Service"}
            </Link>
            <Link href="/docs" className="hover:text-primary transition-colors">
              {"Documentation"}
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-[12px] md:text-[14px] text-white/50 tracking-tightest font-medium text-center">
            {`© ${currentYear} BlinkInvoice. Built on Solana for Africa.`}
          </div>
        </div>
      </div>
    </footer>
  );
};
