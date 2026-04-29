// "use client";

// import { useWallet } from "@solana/wallet-adapter-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";

// export default function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
//   const { connected, connecting } = useWallet();
//   const router = useRouter();
//   const hasCheckedAuth = useRef(false);
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     // Allow time for wallet adapter to initialize from localStorage
//     const initTimer = setTimeout(() => {
//       setIsReady(true);
//     }, 2000); // 2 seconds for wallet to fully initialize

//     return () => clearTimeout(initTimer);
//   }, []);

//   useEffect(() => {
//     if (!isReady || hasCheckedAuth.current) return;

//     // If wallet is connected, allow access
//     if (connected) {
//       hasCheckedAuth.current = true;
//       return;
//     }

//     // If wallet is in the process of connecting, wait
//     if (connecting) {
//       return;
//     }

//     // If not connected and not connecting after the grace period, redirect
//     if (!connecting && !connected) {
//       console.warn("AuthGuard: No wallet detected. Redirecting to home.");
//       hasCheckedAuth.current = true;
//       router.replace("/");
//     }
//   }, [isReady, connected, connecting, router]);

//   // Show loader while waiting for wallet initialization
//   if (!isReady || !connected) {
//     return (
//       <div className="fixed inset-0 z-9999 bg-[#000000] flex flex-col items-center justify-center">
//         <div className="w-12 h-12 border-2 border-[#14F195] border-t-transparent rounded-full animate-spin mb-4" />
//         <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
//           {"Verifying Session..."}
//         </p>
//       </div>
//     );
//   }

//   // If connected, show the dashboard!
//   return <>{children}</>;
// }