import { MoreVertical, Edit2, Share2, BarChart2, Copy } from "lucide-react";

const LINKS_DATA = [
  { id: 1, name: "Exclusive Design Kit", date: "Created 2 days ago", link: "pay.fi/ex-dk..", sol: "5.20", ngn: "₦340,500", sales: "45", status: true },
  { id: 2, name: "Solana Genesis NFT", date: "Created 1 week ago", link: "pay.fi/gen-n..", sol: "12.00", ngn: "₦785,000", sales: "12", status: true },
  { id: 3, name: "Trading Masterclass", date: "Archived 3 days ago", link: "pay.fi/tr-ma..", sol: "1.50", ngn: "₦98,000", sales: "188", status: false },
  { id: 4, name: "VIP Concert Access", date: "Created 4 hours ago", link: "pay.fi/vip-c..", sol: "0.85", ngn: "₦55,250", sales: "3", status: true },
];

export const LinksTable = () => {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/20">
          <th className="px-6 py-5 font-bold">Item Name</th>
          <th className="px-6 py-5 font-bold">Short Link</th>
          <th className="px-6 py-5 font-bold text-center">Price</th>
          <th className="px-6 py-5 font-bold text-center">Sales</th>
          <th className="px-6 py-5 font-bold text-center">Status</th>
          <th className="px-6 py-5 font-bold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {LINKS_DATA.map((item) => (
          <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
            <td className="px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary transition-colors">
                  <div className="w-5 h-5 border-2 border-current rounded-md opacity-40" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-[10px] text-white/20">{item.date}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-5">
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 w-fit">
                <span className="text-[11px] font-mono text-white/40">{item.link}</span>
                <Copy size={12} className="text-white/20 hover:text-white cursor-pointer" />
              </div>
            </td>
            <td className="px-6 py-5 text-center">
              <p className="text-sm font-bold text-white">{item.sol} SOL</p>
              <p className="text-[10px] text-[#14F195] font-bold">{item.ngn}</p>
            </td>
            <td className="px-6 py-5 text-center">
              <p className="text-sm font-bold text-white">{item.sales}</p>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">Sales</p>
            </td>
            <td className="px-6 py-5">
               <div className="flex justify-center">
                <div className={`w-10 h-5 rounded-full p-1 transition-colors ${item.status ? 'bg-[#14F195]' : 'bg-white/10'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${item.status ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
               </div>
            </td>
            <td className="px-6 py-5">
              <div className="flex items-center justify-end gap-4 text-white/20">
                <BarChart2 size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Edit2 size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Share2 size={18} className="hover:text-white cursor-pointer transition-colors" />
                <MoreVertical size={18} className="hover:text-white cursor-pointer transition-colors" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};