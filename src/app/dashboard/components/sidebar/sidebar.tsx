"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Zap,
  BarChart3,
  Settings,
  HelpCircle,
  Plus,
  X,
} from "lucide-react";

interface SidebarProps {
  onCreateClick?: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const SidebarLink = ({ href, icon, label, onClick }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive
          ? "bg-white/5 text-primary border border-white/5"
          : "text-white/40 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
    </Link>
  );
};

const SidebarInner = ({
  onCreateClick,
  onMobileClose,
}: {
  onCreateClick?: () => void;
  onMobileClose?: () => void;
}) => (
  <>
    {/* Logo row */}
    <div className="p-6 md:p-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-sm">B</span>
        </div>
        <div>
          <h1 className="text-[1rem] font-bold text-white tracking-tight">BlinkInvoice</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
            Merchant Portal
          </p>
        </div>
      </div>
      {/* Close button — mobile only */}
      <button
        onClick={onMobileClose}
        className="md:hidden p-1 text-white/40 hover:text-white transition-colors"
        aria-label="Close menu"
      >
        <X size={20} />
      </button>
    </div>

    {/* Nav links */}
    <nav className="flex-1 px-4 space-y-1">
      <SidebarLink
        href="/dashboard"
        icon={<LayoutDashboard size={20} />}
        label="Dashboard"
        onClick={onMobileClose}
      />
      <SidebarLink
        href="/dashboard/invoices"
        icon={<FileText size={20} />}
        label="Invoices"
        onClick={onMobileClose}
      />
      <SidebarLink
        href="/dashboard/payment-links"
        icon={<Zap size={20} />}
        label="Payment Links"
        onClick={onMobileClose}
      />
      <SidebarLink
        href="/dashboard/analytics"
        icon={<BarChart3 size={20} />}
        label="Analytics"
        onClick={onMobileClose}
      />
    </nav>

    {/* Bottom */}
    <div className="p-4 mt-auto border-t border-white/5 space-y-4">
      <button
        onClick={() => {
          onCreateClick?.();
          onMobileClose?.();
        }}
        className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(20,241,149,0.2)]"
      >
        <Plus size={20} />
        {"Create New Blink"}
      </button>

      <div className="space-y-1">
        <SidebarLink
          href="/dashboard/settings"
          icon={<Settings size={20} />}
          label="Settings"
          onClick={onMobileClose}
        />
        <SidebarLink
          href="/dashboard/help"
          icon={<HelpCircle size={20} />}
          label="Help"
          onClick={onMobileClose}
        />
      </div>
    </div>
  </>
);

export const Sidebar = ({ onCreateClick, isMobileOpen = false, onMobileClose }: SidebarProps) => (
  <>
    {/* Desktop: fixed sidebar */}
    <aside className="hidden md:flex flex-col w-[280px] h-screen fixed left-0 top-0 bg-[#0A0A0B] border-r border-white/5 z-40">
      <SidebarInner onCreateClick={onCreateClick} />
    </aside>

    {/* Mobile: backdrop */}
    <div
      className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
        isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onMobileClose}
    />

    {/* Mobile: slide-in drawer */}
    <aside
      className={`md:hidden fixed left-0 top-0 z-50 h-screen w-[280px] bg-[#0A0A0B] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarInner onCreateClick={onCreateClick} onMobileClose={onMobileClose} />
    </aside>
  </>
);
