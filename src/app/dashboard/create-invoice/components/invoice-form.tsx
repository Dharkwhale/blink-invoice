"use client";

import React, { useState, useEffect } from "react"; 
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Calendar, UploadCloud } from "lucide-react";
import { InvoiceData } from "@/components/checkoutcard";

const invoiceSchema = z.object({
  fullName: z.string().min(2, "Client name is required"),
  walletAddress: z.string().min(32, "Enter a valid Solana address or .sol domain"),
  projectTitle: z.string().min(3, "Project title is required"),
  amountSol: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be greater than 0",
  }),
  dueDate: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  initialData: InvoiceData;
  onUpdate: (newData: Partial<InvoiceData>) => void;
}

export const InvoiceForm = ({ initialData, onUpdate }: InvoiceFormProps) => {
  const router = useRouter(); 
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      amountSol: "",
      projectTitle: "",
      fullName: "",
    },
  });

  // --- 1. LIVE PREVIEW WATCHERS ---
  // We watch these specific fields so we can push changes to the preview card instantly
  const watchedAmount = watch("amountSol");
  const watchedTitle = watch("projectTitle");
  const watchedName = watch("fullName");

  useEffect(() => {
    // Calculate conversions for the preview card
    const solValue = Number(watchedAmount) || 0;
    const ngnValue = (solValue * 214800).toLocaleString();
    const usdcValue = (solValue * 142.50).toFixed(2);

    onUpdate({ 
      amountSol: watchedAmount,
      description: watchedTitle, // Project Title maps to Description on the card
      merchantName: watchedName,   // Client name or Business name
      amountNgn: ngnValue,
      amountUsdc: usdcValue
    });
  }, [watchedAmount, watchedTitle, watchedName, onUpdate]);

  // --- LOGO UPLOAD LOGIC ---
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800 * 1024) { 
         alert("Logo too large. Please use a smaller file under 800KB.");
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const logoData = reader.result as string;
        setLogoPreview(logoData);
        onUpdate({ brandLogo: logoData });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: InvoiceFormValues) => {
    const params = new URLSearchParams({
      type: "invoice",
      name: data.fullName,
      sol: data.amountSol,
      desc: data.projectTitle,
      img: logoPreview || "",
      to: data.walletAddress,
    });

    router.push(`/dashboard/success?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500">
      
      {/* CLIENT DETAILS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#14F195] text-[10px] font-bold uppercase tracking-widest">
          <div className="w-1 h-1 bg-current rounded-full" />
          Client Details
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] text-white/40 ml-1">Business/Full Name</label>
            <input 
              {...register("fullName")}
              placeholder="e.g. Zanuth Design Studio"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#A855F7] outline-none transition-all text-white"
            />
            {errors.fullName && <p className="text-red-500 text-[10px] ml-1">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-white/40 ml-1">Settlement Wallet Address</label>
            <input 
              {...register("walletAddress")}
              placeholder="0x... or .sol domain"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#A855F7] outline-none transition-all text-white"
            />
            {errors.walletAddress && <p className="text-red-500 text-[10px] ml-1">{errors.walletAddress.message}</p>}
          </div>
        </div>
      </section>

      {/* PROJECT SCOPE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#14F195] text-[10px] font-bold uppercase tracking-widest">
          <div className="w-1 h-1 bg-current rounded-full" />
          Description
        </div>
        <div className="space-y-1">
          <input 
            {...register("projectTitle")}
            placeholder="e.g. Branding & UI Audit"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#A855F7] outline-none transition-all text-white"
          />
          {errors.projectTitle && <p className="text-red-500 text-[10px] ml-1">{errors.projectTitle.message}</p>}
        </div>
      </section>

      {/* PRICING & SETTLEMENT */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#14F195] text-[10px] font-bold uppercase tracking-widest">
          <div className="w-1 h-1 bg-current rounded-full" />
          Pricing & Settlement
        </div>
        <div className="space-y-2">
          <div className="relative">
            <input
              {...register("amountSol")}
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-6 text-2xl font-bold focus:border-[#A855F7] outline-none transition-all text-white"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">SOL</span>
          </div>

          <div className="flex items-center gap-3 px-1">
            <div className="bg-[#14F195]/10 border border-[#14F195]/20 rounded-lg px-2 py-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#14F195] rounded-full" />
              <span className="text-[10px] font-bold text-[#14F195]">$ {(Number(watchedAmount) * 142.50).toFixed(2)} USD</span>
            </div>
            <span className="text-[10px] text-white/20 font-medium">₦ {(Number(watchedAmount) * 214800).toLocaleString()} NGN</span>
          </div>
        </div>
      </section>

      {/* INVOICE BRANDING */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#14F195] text-[10px] font-bold uppercase tracking-widest">
          <div className="w-1 h-1 bg-current rounded-full" />
          Invoice Branding (Optional)
        </div>
        
        <label className="border-2 border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group relative overflow-hidden min-h-[140px]">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleLogoChange} 
          />
          
          {logoPreview ? (
            <>
              <img 
                src={logoPreview} 
                alt="Logo Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-20" 
              />
              <div className="relative z-10 flex flex-col items-center">
                <UploadCloud size={20} className="text-[#14F195] mb-2" />
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Replace Logo</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud size={20} className="text-white/20 group-hover:text-[#14F195]" />
              </div>
              <p className="text-xs font-medium text-white/60 mb-1">Add your logo or project preview</p>
              <p className="text-[9px] text-white/20 uppercase tracking-tighter text-center">Recommended for professional billing</p>
            </>
          )}
        </label>
      </section>

      {/* DUE DATE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#14F195] text-[10px] font-bold uppercase tracking-widest">
          <div className="w-1 h-1 bg-current rounded-full" />
          Due Date (Optional)
        </div>
        <div className="relative">
          <input 
            type="date"
            {...register("dueDate")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#A855F7] outline-none transition-all appearance-none"
          />
          <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
        </div>
      </section>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#A855F7] to-[#9333EA] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : "Generate Invoice Link"}
        <Send size={18} />
      </button>

      <p className="text-center text-[8px] text-white/20 uppercase tracking-widest">
        BlinkInvoice settlement engine • Verified by Solana
      </p>
    </form>
  );
};