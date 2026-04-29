"use client";

import React, { useState, use } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, Zap } from "lucide-react";

// 1. Import your shared component and Solana tools
import CheckoutCard, { InvoiceData } from "@/components/checkoutcard";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";

// Note: Next.js 15 requires params to be a Promise if you use them, 
// but since we are using useSearchParams for the data, we can keep it simple.
export default function PublicCheckoutPage() {
  const searchParams = useSearchParams();
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();
  const { setVisible } = useWalletModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  // 2. Map URL data to the Card
  const dynamicData: InvoiceData = {
  merchantName: searchParams.get("name") || "Merchant Name",
  brandLogo: searchParams.get("img") || "https://img.logoipsum.com/296.svg",
  amountSol: searchParams.get("sol") || "0.00",
  amountUsdc: (Number(searchParams.get("sol")) * 142.50).toFixed(2),
  amountNgn: (Number(searchParams.get("sol")) * 214800).toLocaleString(),
  
  // CHANGE THIS: Use "desc" instead of "title" to match your URL
  description: searchParams.get("desc") || "Service Description",
  
  invoiceId: "INV-" + Math.floor(Math.random() * 1000), 
};

  // 3. Payment Logic (Using the dynamic amount from the URL)
  const handlePaymentAction = async () => {
    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }

    const toAddress = searchParams.get("to");
    if (!toAddress) {
      alert("No merchant wallet found in this link. Please contact the sender.");
      return;
    }

    try {
      setIsProcessing(true);
      const merchantWallet = new PublicKey(toAddress);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: merchantWallet,
          lamports: parseFloat(dynamicData.amountSol) * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);
      setTxSignature(signature);
      
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Make sure you have enough Devnet SOL!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col font-sans">
      <header className="w-full p-6 flex items-center justify-between max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-[#A855F7] fill-current" />
          <span className="font-bold text-lg">BlinkInvoice</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-white/40 uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <ShieldCheck size={14} className="text-[#14F195]" />
          Secure
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A855F7] rounded-full blur-[150px] opacity-10 pointer-events-none" />
        
        {/* THE MAGIC: The Shared Card is now dynamic! */}
        <CheckoutCard data={dynamicData} />

        {/* The Action Button sits below the card */}
        {!txSignature && (
          <div className="w-full max-w-md mt-6 px-8">
             <button 
                onClick={handlePaymentAction}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white font-bold text-lg py-5 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {isProcessing ? "Processing..." : connected ? "Confirm & Pay Now" : "Connect & Pay"}
              </button>
          </div>
        )}

        {txSignature && (
            <p className="mt-4 text-[#14F195] font-mono text-xs">
                Success! Hash: {txSignature.slice(0, 10)}...
            </p>
        )}
      </main>
    </div>
  );
}