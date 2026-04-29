import { BarChart3, TrendingUp, Award, Wallet } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: ReactNode;
  trend?: string;
}

export const LinkStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Total Link Revenue" 
        value="1,240.50 SOL" 
        subValue="≈ ₦112.4M" 
        icon={<Wallet className="text-white/60" size={20} />}
      />
      <StatCard 
        label="Avg. Conversion Rate" 
        value="14.8%" 
        icon={<TrendingUp className="text-[#14F195]" size={20} />}
        trend="+2.4% vs last month"
      />
      <StatCard 
        label="Top Performing Link" 
        value="Exclusive Desig..." 
        icon={<Award className="text-[#14F195]" size={20} />}
      />
    </div>
  );
};

const StatCard = ({ label, value, subValue, icon, trend }: StatCardProps) => (
  <div className="bg-[#0A0A0B] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      {trend && <span className="text-[10px] text-[#14F195] font-bold bg-[#14F195]/10 px-2 py-1 rounded-lg">{trend}</span>}
    </div>
    <p className="text-white/40 text-xs font-medium mb-1 uppercase tracking-wider">{label}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      {subValue && <span className="text-[#14F195] text-xs font-bold">{subValue}</span>}
    </div>
  </div>
);