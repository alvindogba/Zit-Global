import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, Search, Filter } from 'lucide-react';
import { fetchReferrals } from '../../store/slices/referralSlice';
import { RootState } from '../../store/store';

const Referrals: React.FC = () => {
  const dispatch = useDispatch();
  const { list: referrals, loading } = useSelector((state: RootState) => state.referral);

  useEffect(() => {
    dispatch(fetchReferrals() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Referrals</h1>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction ID..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <Users size={20} className="text-blue-500" />
              Active Referrals
            </h2>
            <select className="border rounded-lg px-3 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-6">Transaction ID</th>
                <th className="text-left py-3 px-6">Source</th>
                <th className="text-right py-3 px-6">Date</th>
                <th className="text-right py-3 px-6">Amount</th>
                <th className="text-right py-3 px-6">Commission</th>
                <th className="text-right py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-mono">{referral.transaction_id}</td>
                  <td className="py-4 px-6">{referral.source}</td>
                  <td className="py-4 px-6 text-right">
                    {new Date(referral.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">${referral.amount}</td>
                  <td className="py-4 px-6 text-right">${referral.commission}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      referral.status === 'completed' ? 'bg-green-100 text-green-800' :
                      referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {referral.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {referrals.length} entries
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">1</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals