import React, { useState, useEffect } from 'react';
import { DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, trend, trendUp }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="text-gray-500">{title}</div>
        <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className={`text-sm flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
        <TrendingUp size={16} className={`mr-1 ${trendUp ? '' : 'transform rotate-180'}`} />
        {trend}
      </div>
    </div>
  );
};

const DashboardSection: React.FC = () => {
  const [counts, setCounts] = useState({
    earnings: 0,
    referrals: 0,
    withdrawable: 0
  });
  
  useEffect(() => {
    const targetCounts = {
      earnings: 1200,
      referrals: 45,
      withdrawable: 800
    };
    
    const duration = 2000; // 2 seconds for the animation
    const steps = 50;
    const interval = duration / steps;
    
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      
      setCounts({
        earnings: Math.floor(targetCounts.earnings * progress),
        referrals: Math.floor(targetCounts.referrals * progress),
        withdrawable: Math.floor(targetCounts.withdrawable * progress)
      });
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full mb-4">
            Dashboard
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Your Earnings at a Glance</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our intuitive dashboard gives you real-time insights into your affiliate performance.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 bg-blue-700 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Affiliate Dashboard</h3>
              <div className="text-sm bg-white/20 rounded-full px-4 py-1">
                Last Updated: Just Now
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <StatCard 
              icon={<DollarSign size={20} />}
              title="Total Earnings"
              value={`$${counts.earnings.toLocaleString()}`}
              trend="12% from last month"
              trendUp={true}
            />
            <StatCard 
              icon={<Users size={20} />}
              title="Active Referrals"
              value={counts.referrals.toString()}
              trend="8% from last month"
              trendUp={true}
            />
            <StatCard 
              icon={<CreditCard size={20} />}
              title="Withdrawable Balance"
              value={`$${counts.withdrawable.toLocaleString()}`}
              trend="Available Now"
              trendUp={true}
            />
          </div>
          
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-gray-700">Recent Activity</div>
              <div className="text-blue-600 text-sm font-medium">View All</div>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-gray-50 flex justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <div className="font-medium">New Donation</div>
                    <div className="text-sm text-gray-500">From: climate-action.org</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">+$45.00</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 flex justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="font-medium">New Referral</div>
                    <div className="text-sm text-gray-500">From: your-blog-post</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">5 clicks</div>
                  <div className="text-xs text-gray-500">5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all w-full">
              Withdraw Funds
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;