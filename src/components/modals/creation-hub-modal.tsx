"use client";

import React from "react";
import { X, Zap, User, Info } from "lucide-react";
import { useRouter } from "next/navigation"; // 1. Import the router

interface CreationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  // We can keep these optional in case you still want to pass custom logic later
  onSelectPaymentLink?: () => void;
  onSelectInvoice?: () => void;
}

export const CreationHubModal = ({ 
  isOpen, 
  onClose, 
  onSelectPaymentLink, 
  onSelectInvoice 
}: CreationHubModalProps) => {
  const router = useRouter(); // 2. Initialize the router

  if (!isOpen) return null;

  // Internal navigation handlers
  const handlePaymentLinkSelect = () => {
    if (onSelectPaymentLink) {
      onSelectPaymentLink();
    } else {
      router.push("/dashboard/payment-links/create");
    }
    onClose();
  };

  const handleInvoiceSelect = () => {
    if (onSelectInvoice) {
      onSelectInvoice();
    } else {
      // Assuming this is your invoice creation path
      router.push("/dashboard/invoices/create"); 
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#0A0A0B] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-white/20 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-10 pt-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            What are you creating today?
          </h2>
          <p className="text-white/40 text-sm mb-12">
            Select a flow to initiate your next financial movement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Option A: Payment Link */}
            <button 
              onClick={handlePaymentLinkSelect} // 3. Use the handler
              className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] transition-all hover:bg-white/[0.04] hover:border-[#A855F7]/30 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#A855F7]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#A855F7]/20 transition-all duration-300">
                <Zap size={24} className="text-[#A855F7] fill-[#A855F7]/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Payment Link</h3>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mb-4">One-to-Many</p>
              <p className="text-xs text-white/40 leading-relaxed mb-8 h-12 max-w-[180px]">
                Create a shareable link for products, subscriptions, or donations.
              </p>
              <div className="bg-white/5 group-hover:bg-[#A855F7] group-hover:text-white text-white/60 text-[10px] font-bold py-2 px-6 rounded-full uppercase tracking-widest transition-all">
                Select Flow
              </div>
            </button>

            {/* Option B: Client Invoice */}
            <button 
              onClick={handleInvoiceSelect} // 4. Use the handler
              className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] transition-all hover:bg-white/[0.04] hover:border-[#14F195]/30 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#14F195]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#14F195]/20 transition-all duration-300">
                <User size={24} className="text-[#14F195] fill-[#14F195]/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Client Invoice</h3>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mb-4">One-to-One</p>
              <p className="text-xs text-white/40 leading-relaxed mb-8 h-12 max-w-[180px]">
                Issue a formal billing document to a specific business or client.
              </p>
              <div className="bg-white/5 group-hover:bg-[#14F195] group-hover:text-black text-white/60 text-[10px] font-bold py-2 px-6 rounded-full uppercase tracking-widest transition-all">
                Select Flow
              </div>
            </button>

          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-white/20 font-medium">
            <Info size={14} />
            <p>BlinkInvoice handles settlement in SOL, with dual NGN pricing.</p>
          </div>
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#A855F7] to-transparent opacity-30" />
      </div>
    </div>
  );
};