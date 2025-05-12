import React from 'react';
import { LineChart, BarChart as PieChart } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Traffic Sources</h3>
            <PieChart size={20} className="text-blue-500" />
          </div>
          <div className="space-y-4">
            {[
              { source: 'Social Media', percentage: 0 },
              { source: 'Direct Links', percentage: 0 },
              { source: 'Blog Posts', percentage: 0 },
            ].map((item) => (
              <div key={item.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.source}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Conversion Trends</h3>
            <LineChart size={20} className="text-blue-500" />
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 75, 55, 85, 35, 95].map((height, index) => (
              <div key={index} className="flex-1">
                <div 
                  className="bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-all"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Analytics;