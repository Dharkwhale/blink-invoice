"use client";

import React, { useState } from "react"; // Added useState
import { useRouter } from "next/navigation";
import { Plus, Link as LinkIcon, BarChart3, Zap } from "lucide-react";

// Assuming these are the names of your components in the /components folder
import { LinkStats } from "./components/link-stats";
import { LinksTable } from "./components/links-table";
import { EmptyState } from "./components/empty-state";
import { CreationHubModal } from "@/components/modals/creation-hub-modal"; // Adjust this path to your actual modal file

export default function PaymentLinksHistoryPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the popup
  
  const hasLinks = true; 

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">Payment Links</h1>
            <span className="text-[10px] bg-white/10 text-white/60 px-2 py-1 rounded-full font-bold uppercase tracking-widest">
              12 Active
            </span>
          </div>
          <p className="text-white/40 text-sm mt-1">Manage and share your lightning-fast checkout links.</p>
        </div>
        
        {/* CHANGED: Link replaced with button to trigger the modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#A855F7] hover:bg-[#9333EA] text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/10"
        >
          <Plus size={18} />
          Create New Link
        </button>
      </div>

      {!hasLinks ? (
        <EmptyState onCreateClick={() => setIsModalOpen(true)} />
      ) : (
        <>
          <div className="mb-10">
            <LinkStats />
          </div>

          <div className="bg-[#0A0A0B] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
                <h3 className="text-sm font-bold text-white/60">Recent Storefronts</h3>
            </div>
            <LinksTable />
          </div>
        </>
      )}

      {/* FOOTER SHORTCUT */}
      <div className="mt-10 flex justify-center">
         <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium">
            BlinkInvoice Settlement Engine v1.0
         </p>
      </div>

      {/* THE MODAL POPUP */}
      <CreationHubModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}