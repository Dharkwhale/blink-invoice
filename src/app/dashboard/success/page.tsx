"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CheckoutCard, { InvoiceData } from "@/components/checkoutcard";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";

// useSearchParams() must live inside a Suspense boundary in Next.js App Router
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/40">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [copiedBlink, setCopiedBlink] = useState(false);
  const [copiedLocal, setCopiedLocal] = useState(false);

  const [invoiceId] = useState(() => "LINK-" + String(Math.floor(Math.random() * 10000)));

  const invoiceData: InvoiceData = {
    merchantName: searchParams.get("name") || "Merchant",
    brandLogo: searchParams.get("img") || "https://img.logoipsum.com/296.svg",
    amountSol: searchParams.get("sol") || "0.00",
    amountUsdc: (Number(searchParams.get("sol")) * 142.50).toFixed(2),
    amountNgn: (Number(searchParams.get("sol")) * 214800).toLocaleString(),
    description: searchParams.get("desc") || "Payment Details",
    invoiceId,
  };

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const isLocalhost = origin.includes("localhost") || origin.includes("127.0.0.1");

  const blinkParams = new URLSearchParams({
    name: searchParams.get("name") || "",
    sol: searchParams.get("sol") || "",
    desc: searchParams.get("desc") || "",
    to: searchParams.get("to") || "",
  });
  const actionUrl = `${origin}/api/actions/pay?${blinkParams.toString()}`;
  const blinkUrl = `https://dial.to/?action=solana-action:${encodeURIComponent(actionUrl)}`;
  const localUrl = `${origin}/pay/blink?${searchParams.toString()}`;

  const copy = (text: string, which: "blink" | "local") => {
    navigator.clipboard.writeText(text);
    if (which === "blink") {
      setCopiedBlink(true);
      setTimeout(() => setCopiedBlink(false), 2000);
    } else {
      setCopiedLocal(true);
      setTimeout(() => setCopiedLocal(false), 2000);
    }
  };

  const xText = encodeURIComponent(
    `Pay me ${searchParams.get("sol")} SOL for "${searchParams.get("name")}" — powered by @BlinkInvoice ⚡`
  );
  const xShareUrl = `https://twitter.com/intent/tweet?text=${xText}&url=${encodeURIComponent(blinkUrl)}`;

  return (
    <div className="min-h-screen bg-[#050505] p-10 flex flex-col lg:flex-row gap-10 items-center justify-center">

      {/* Left: Share Controls */}
      <div className="max-w-md w-full space-y-6 animate-in slide-in-from-left duration-700">
        <div>
          <h1 className="text-4xl font-bold text-white">Blink Created!</h1>
          <p className="text-white/40 mt-1 text-sm">Your payment link is live and ready to share.</p>
        </div>

        {/* Localhost warning */}
        {isLocalhost && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 space-y-1">
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Development mode</p>
            <p className="text-yellow-400/80 text-[11px] leading-relaxed">
              This Blink URL points to <span className="font-mono">localhost</span> — dial.to and X cannot reach it.
              Deploy your app to Netlify (or any public host) first, then generate the link from the deployed URL.
            </p>
          </div>
        )}

        {/* Solana Blink URL */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Solana Blink — Share on X</p>
          </div>
          <div className="bg-[#111113] p-4 rounded-2xl border border-[#14F195]/20 flex items-center justify-between gap-3">
            <code className="text-[10px] text-[#14F195]/70 truncate">{blinkUrl}</code>
            <button
              onClick={() => copy(blinkUrl, "blink")}
              className="p-2 hover:bg-white/5 rounded-lg transition-all shrink-0"
            >
              {copiedBlink
                ? <Check size={16} className="text-[#14F195]" />
                : <Copy size={16} className="text-white/40" />}
            </button>
          </div>
        </div>

        {/* Local checkout URL */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Direct Checkout Link</p>
          </div>
          <div className="bg-[#111113] p-4 rounded-2xl border border-white/5 flex items-center justify-between gap-3">
            <code className="text-[10px] text-white/40 truncate">{localUrl}</code>
            <button
              onClick={() => copy(localUrl, "local")}
              className="p-2 hover:bg-white/5 rounded-lg transition-all shrink-0"
            >
              {copiedLocal
                ? <Check size={16} className="text-[#14F195]" />
                : <Copy size={16} className="text-white/40" />}
            </button>
          </div>
        </div>

        {/* Share actions */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 bg-black border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-sm"
          >
            {/* X (Twitter) logo as inline SVG — lucide dropped the Twitter icon in v1 */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Post to X
          </a>
          <a
            href={localUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 bg-[#A855F7]/10 border border-[#A855F7]/20 text-[#A855F7] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#A855F7]/20 transition-all text-sm"
          >
            <ExternalLink size={16} />
            Preview
          </a>
        </div>

        <p className="text-[10px] text-white/20 text-center leading-relaxed">
          The X link renders as an interactive Blink card inside the tweet.
          The direct link works on any browser.
        </p>
      </div>

      {/* Right: Preview Card */}
      <div className="animate-in slide-in-from-right duration-700">
        <div className="border-[8px] border-[#111113] rounded-[3rem] p-4 bg-black shadow-2xl">
          <CheckoutCard data={invoiceData} />
        </div>
      </div>

    </div>
  );
}
