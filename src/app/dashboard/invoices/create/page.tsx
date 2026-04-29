"use client";

import React, { useState } from "react";
import { InvoiceForm } from "@/app/dashboard/create-invoice/components/invoice-form";
import CheckoutCard, { type InvoiceData } from "@/components/checkoutcard";
import { Zap } from "lucide-react";

export default function CreateInvoicePage() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    merchantName: "",
    brandLogo: "https://img.logoipsum.com/296.svg",
    amountSol: "",
    amountUsdc: "0.00",
    amountNgn: "0",
    description: "",
    invoiceId: "TEMP-001",
  });

  const handleUpdate = (newData: Partial<InvoiceData>) => {
    setInvoiceData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#A855F7] rounded-full blur-[120px] opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto py-10 px-6 lg:px-10">

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-[#A855F7] fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Invoice Engine v1.0</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Create Direct Invoice</h1>
          <p className="text-white/40 text-sm max-w-md">
            Define your service details. Your changes will reflect in the preview on the right in real-time.
          </p>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT: THE FORM */}
          <div className="bg-[#0A0A0B] border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl animate-in slide-in-from-left-8 duration-700">
            <InvoiceForm initialData={invoiceData} onUpdate={handleUpdate} />
          </div>

          {/* RIGHT: THE LIVE PREVIEW */}
          <div className="sticky top-10 hidden lg:flex flex-col items-center animate-in slide-in-from-right-8 duration-700">
            <div className="w-full mb-6 flex items-center justify-between px-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Live Preview</h2>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
              </div>
            </div>

            <CheckoutCard data={invoiceData} />

            <p className="mt-8 text-[10px] text-white/20 max-w-[280px] text-center leading-relaxed">
              This is exactly how your client will see the payment page after you generate the link.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
