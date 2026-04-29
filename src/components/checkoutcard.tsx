"use client";
import React from "react";
import { CheckCircle2, ReceiptText } from "lucide-react";

export interface InvoiceData {
  merchantName: string;
  brandLogo: string;
  amountSol: string;
  amountUsdc: string;
  amountNgn: string;
  description: string;
  invoiceId: string;
  // These props allow the button to live inside the card
  buttonText?: string;
  onAction?: () => void;
  isProcessing?: boolean;
}

export default function CheckoutCard({ data }: { data: InvoiceData }) {
  return (
    /* This main div is the container. Everything inside it stays in the dark box. */
    <div className="w-full max-w-md bg-[#111113] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 p-8 flex flex-col gap-6">
      
      {/* Brand & Merchant Info */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-2xl flex items-center justify-center p-4 border border-white/10">
          <img 
            src={data.brandLogo || "https://img.logoipsum.com/296.svg"} 
            alt="Logo" 
            className="w-full h-full object-contain" 
          />
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-xl font-bold">{data.merchantName || "Your Brand"}</h1>
          <CheckCircle2 size={16} className="text-[#14F195]" />
        </div>
        <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
          {data.invoiceId ? `Invoice #${data.invoiceId}` : "Draft Invoice"}
        </p>
      </div>

      {/* Pricing Section */}
      <div className="bg-black/40 border border-white/5 rounded-3xl p-6 text-center">
        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Amount Due</p>
        <div className="flex flex-col gap-1">
          <span className="text-5xl font-bold">
            {data.amountSol || "0.00"} <span className="text-2xl text-[#A855F7]">SOL</span>
          </span>
          <div className="flex items-center justify-center gap-2 text-sm font-bold mt-1">
            <span className="text-[#14F195]">≈ ₦{data.amountNgn || "0"}</span>
            <span className="text-white/20">|</span>
            <span className="text-blue-400">${data.amountUsdc || "0"} USDC</span>
          </div>
        </div>
      </div>

      {/* Description Box */}
      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
        <div className="flex items-start gap-3 text-left">
          <ReceiptText size={18} className="text-[#A855F7] mt-0.5" />
          <div>
            <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Service Description</p>
            <p className="text-sm text-white/80 leading-relaxed">
              {data.description || "Describe your service here..."}
            </p>
          </div>
        </div>
      </div>

      {/* THE BUTTON: Now inside the p-8 padding of the main container */}
      {data.onAction && (
        <button 
          onClick={data.onAction}
          disabled={data.isProcessing}
          className="w-full bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white font-bold text-lg py-5 rounded-2xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
        >
          {data.isProcessing ? "Processing..." : data.buttonText || "Confirm & Pay Now"}
        </button>
      )}
    </div>
  );
}