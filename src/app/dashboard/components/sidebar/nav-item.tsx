"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

export const NavItem = ({ icon: Icon, label, href }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        isActive 
          ? "bg-white/5 text-white border border-white/10" 
          : "text-white/50 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon size={20} className={cn(
        "transition-colors",
        isActive ? "text-primary" : "group-hover:text-primary"
      )} />
      <span className="text-[14px] font-medium tracking-tight">
        {label}
      </span>
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </Link>
  );
};