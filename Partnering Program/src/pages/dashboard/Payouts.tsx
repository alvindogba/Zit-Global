import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreditCard, DollarSign, Download } from 'lucide-react';
import { fetchPayouts, requestPayout } from '../../store/slices/payoutSlice';
import { RootState } from '../../store/store';
import { toast } from 'react-hot-toast';

const Payouts: React.FC = () => {
  const dispatch = useDispatch();
  const { list: payouts, loading } = useSelector((state: RootState) => state.payout);
  const stats = useSelector((state: RootState) => state.referral.stats);

  useEffect(() => {
    dispatch(fetchPayouts() as any);
  }, [dispatch]);

  const handleRequestPayout = async (amount: number) => {
    try {
      await dispatch(requestPayout(amount) as any);
      toast.success('Payout request submitted successfully');
    } catch (error) {
      toast.error('Failed to request payout');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payouts</h1>

      {/* Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Available Balance</h3>
            <DollarSign size={24} />
          </div>
          <div className="text-3xl font-bold mb-4">${stats?.total_commission || '0.00'}</div>
          <button 
            onClick={() => handleRequestPayout(stats?.total_commission || 0)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50"
          >
            Withdraw Funds
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <CreditCard size={24} className="text-blue-500" />
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-lg mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard size={24} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-gray-500">Connected</div>
            </div>
          </div>
          <button className="text-blue-600 font-medium">
            + Add Payment Method
          </button>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Payout History</h2>
            <button className="flex items-center gap-2 text-blue-600">
              <Download size={20} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-6">Transaction ID</th>
                <th className="text-left py-3 px-6">Date</th>
                <th className="text-left py-3 px-6">Method</th>
                <th className="text-right py-3 px-6">Amount</th>
                <th className="text-right py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-mono">{payout.id}</td>
                  <td className="py-4 px-6">
                    {new Date(payout.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">{payout.method}</td>
                  <td className="py-4 px-6 text-right">${payout.amount}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payout.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payout.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payouts