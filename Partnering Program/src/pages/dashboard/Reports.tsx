import React from 'react';
import { PieChart, Download, Calendar } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar size={20} />
            <span>Date Range</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Total Revenue', value: '$12,345.67', change: '+15.3%' },
          { title: 'Average Order Value', value: '$85.20', change: '+5.2%' },
          { title: 'Conversion Rate', value: '3.2%', change: '+0.8%' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm mb-2">{stat.title}</h3>
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm text-green-600">{stat.change} from last month</div>
          </div>
        ))}
      </div>

      {/* Detailed Reports */}
      <div className="space-y-6">
        {/* Revenue by Source */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center gap-2">
              <PieChart size={20} className="text-blue-500" />
              Revenue by Source
            </h2>
            <select className="border rounded-lg px-3 py-1">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Source</th>
                  <th className="text-right py-3 px-4">Revenue</th>
                  <th className="text-right py-3 px-4">Orders</th>
                  <th className="text-right py-3 px-4">Avg. Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { source: 'Social Media', revenue: '$5,234.56', orders: 89, avg: '$58.82' },
                  { source: 'Direct Links', revenue: '$3,456.78', orders: 52, avg: '$66.48' },
                  { source: 'Blog Posts', revenue: '$2,345.67', orders: 34, avg: '$69.02' },
                  { source: 'Email Marketing', revenue: '$1,234.56', orders: 21, avg: '$58.79' },
                ].map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{row.source}</td>
                    <td className="text-right py-3 px-4 font-medium">{row.revenue}</td>
                    <td className="text-right py-3 px-4">{row.orders}</td>
                    <td className="text-right py-3 px-4">{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-6">Performance Metrics</h2>
          <div className="space-y-4">
            {[
              { metric: 'Click-through Rate', value: 8.2, target: 10 },
              { metric: 'Conversion Rate', value: 3.1, target: 5 },
              { metric: 'Average Time to Convert', value: 2.5, target: 2 },
            ].map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{metric.metric}</span>
                  <span>{metric.value}% / {metric.target}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(metric.value / metric.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;