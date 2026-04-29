"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Zap, UploadCloud, AlertCircle } from "lucide-react";
import { InvoiceData } from "@/components/checkoutcard";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const paymentLinkSchema = z.object({
  itemName: z.string().min(2, "Item name is required"),
  priceSol: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be greater than 0",
  }),
  description: z.string().min(10, "Please provide a brief description (min 10 chars)"),
});

type PaymentLinkFormValues = z.infer<typeof paymentLinkSchema>;

// 1. Define the Props interface
interface PaymentLinkFormProps {
  onUpdate: (newData: Partial<InvoiceData>) => void;
}

export function PaymentLinkForm({ onUpdate }: PaymentLinkFormProps) {
  const router = useRouter();
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PaymentLinkFormValues>({
    resolver: zodResolver(paymentLinkSchema),
    defaultValues: {
      priceSol: "",
      itemName: "",
      description: ""
    },
  });

  const price = watch("priceSol");
  const itemName = watch("itemName");
  const description = watch("description");

  // 3. THE LIVE SYNC WATCHER
  useEffect(() => {
    const solValue = Number(price) || 0;
    
    onUpdate({
      merchantName: itemName || "Item Name",
      amountSol: price || "0.00",
      description: description || "Describe what the customer is buying...",
      amountNgn: (solValue * 214800).toLocaleString(),
      amountUsdc: (solValue * 142.50).toFixed(2),
    });
  }, [price, itemName, description, onUpdate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { 
          alert("Image too large. Please use a smaller thumbnail (under 1MB).");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setPreviewImage(imageData); 
        onUpdate({ brandLogo: imageData }); // Update preview card logo instantly
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PaymentLinkFormValues) => {
    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }
    const params = new URLSearchParams({
      type: "payment-link",
      name: data.itemName,
      sol: data.priceSol,
      desc: data.description,
      img: previewImage || "",
      to: publicKey.toBase58(),
    });
    router.push(`/dashboard/success?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in duration-500">
      
      {/* ITEM NAME */}
      <div className="space-y-2">
        <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Item Name</label>
        <input 
          {...register("itemName")}
          placeholder="e.g. Web3 Masterclass"
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#A855F7] outline-none transition-all text-white"
        />
        {errors.itemName && <p className="text-red-500 text-[10px] mt-1">{errors.itemName.message}</p>}
      </div>

      {/* FIXED PRICE */}
      <div className="space-y-2">
        <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Fixed Price</label>
        <div className="relative">
          <input
            {...register("priceSol")}
            placeholder="0.00"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-5 text-xl font-bold focus:border-[#A855F7] outline-none transition-all text-white"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">SOL</span>
        </div>
        
        <div className="flex items-center gap-3 mt-2 px-1">
          <div className="bg-[#14F195]/10 border border-[#14F195]/20 rounded-lg px-2 py-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#14F195] rounded-full" />
              <span className="text-[10px] font-bold text-[#14F195]">$ {(Number(price) * 142.50).toLocaleString()} USD</span>
          </div>
          <span className="text-[10px] text-white/20 font-medium">₦ {(Number(price) * 214800).toLocaleString()} NGN</span>
        </div>
        {errors.priceSol && <p className="text-red-500 text-[10px] mt-1">{errors.priceSol.message}</p>}
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Description</label>
        <textarea 
          {...register("description")}
          rows={3}
          placeholder="Describe what the customer is buying..."
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#A855F7] outline-none transition-all resize-none text-white"
        />
        {errors.description && <p className="text-red-500 text-[10px] mt-1">{errors.description.message}</p>}
      </div>

      {/* PRODUCT THUMBNAIL */}
      <div className="space-y-2">
        <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Product Thumbnail</label>
        <label className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group relative overflow-hidden min-h-[160px]">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange} 
          />
          
          {previewImage ? (
            <>
              <img 
                src={previewImage} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-50" 
              />
              <div className="relative z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <UploadCloud size={24} className="text-white mb-2" />
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Change Image</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-[#A855F7]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={24} className="text-[#A855F7]" />
              </div>
              <p className="text-sm font-medium text-white mb-1">Click to upload</p>
              <p className="text-[10px] text-white/20 uppercase tracking-tighter">PNG, JPG or WebP (Max 1MB)</p>
            </>
          )}
        </label>
      </div>

      {!connected && (
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
          <AlertCircle size={14} className="text-yellow-400 shrink-0" />
          <p className="text-[11px] text-yellow-400">Connect your wallet first — it becomes the settlement address for this link.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#A855F7] to-[#C084FC] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 mt-4 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Generating..." : connected ? "Generate Reusable Blink" : "Connect Wallet"}
        <Zap size={18} fill="currentColor" />
      </button>
    </form>
  );
}