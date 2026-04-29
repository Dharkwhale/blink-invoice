"use client";

import React, { useState } from "react";
import { PaymentLinkForm } from "@/app/dashboard/create-payment-link/components/payment-link-form";
import CheckoutCard, { type InvoiceData } from "@/components/checkoutcard";

export default function CreatePaymentLinkPage() {
  const [paymentData, setPaymentData] = useState<InvoiceData>({
    merchantName: "Your Store",
    brandLogo: "https://img.logoipsum.com/296.svg",
    amountSol: "0.00",
    amountUsdc: "0.00",
    amountNgn: "0",
    description: "",
    invoiceId: "PAY-LINK",
  });

  const handleUpdate = (newData: Partial<InvoiceData>) => {
    setPaymentData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* LEFT: FORM */}
        <div className="bg-[#0A0A0B] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
          <h1 className="text-2xl font-bold mb-6 text-white">New Payment Link</h1>
          <PaymentLinkForm onUpdate={handleUpdate} />
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="sticky top-10 hidden lg:block">
          <p className="text-[10px] font-bold uppercase text-white/20 mb-4 tracking-widest">Live Preview</p>
          <CheckoutCard data={paymentData} />
        </div>

      </div>
    </div>
  );
}
