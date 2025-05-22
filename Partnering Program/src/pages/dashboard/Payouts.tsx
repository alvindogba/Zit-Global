import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toast } from 'react-hot-toast';
import { DollarSign, CreditCard, Download } from 'lucide-react';
import { fetchProfile as getProfile } from '../../store/slices/profileSlice';
import { fetchPayouts, requestPayout } from '../../store/slices/payoutSlice';
import paypalIcon from '../../../../client/src/asset/images/paypal.png';

const Payouts: React.FC = () => {
  const dispatch = useDispatch();
  const { list: payouts, loading } = useSelector((state: RootState) => state.payout);
  const stats = useSelector((state: RootState) => state.profile.data);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [tempStripeId, setTempStripeId] = useState('');
  const [tempPaypalEmail, setTempPaypalEmail] = useState('');

  useEffect(() => {
    dispatch(fetchPayouts() as any);
    dispatch(getProfile() as any);
  }, [dispatch]);

  useEffect(() => {
    if (stats) {
      setTempStripeId(stats.stripeAccountId || '');
      setTempPaypalEmail(stats.paypalEmail || '');
    }
  }, [stats]);

  const handleWithdraw = async () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    try {
      // Submit withdrawal request
      const response = await dispatch(requestPayout({
        amount: stats?.withdrawableBalance || 0,
        paymentMethod: selectedMethod
      }) as any).unwrap();

      // If we get a redirect URL (for Stripe onboarding), redirect to it
      if (response.redirect) {
        window.location.href = response.url;
        return;
      }

      toast.success('Withdrawal request submitted successfully');
      setShowPaymentModal(false);
      dispatch(fetchPayouts() as any);
    } catch (error: any) {
      // If there's a pending payout, show the details
      if (error.response?.data?.pendingPayout) {
        const { status, amount, created_at } = error.response.data.pendingPayout;
        toast.error(
          `You have a pending payout request:\n` +
          `Status: ${status}\n` +
           `Amount: $${amount}\n` +
          `Requested: ${new Date(created_at).toLocaleDateString()}`
        );
      } else {
        toast.error(error.response?.data?.error || 'Failed to submit withdrawal request');
      }
    }
  };

  const handlePaymentMethodSubmit = () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    handleWithdraw();
  };

  if (loading) {
    return <div className='text-primary'>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-primary">Payouts</h1>

      {/* Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-white">Available Balance</h3>
            <DollarSign size={24} className="text-secondary"/>
          </div>
          <div className="text-3xl font-bold mb-4">${stats?.withdrawableBalance || '0.00'}</div>
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:text-secondary cursor-pointer"
            disabled={!stats?.withdrawableBalance}
          >
            Withdraw Funds
          </button>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">Payment Methods</h3>
            <CreditCard size={24} className="text-secondary" />
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedMethod('paypal')}
              className={`w-full flex items-center gap-4 p-4 border rounded-lg hover:border-secondary transition-colors ${selectedMethod === 'paypal' ? 'border-secondary bg-secondary/10' : ''}`}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <img src={paypalIcon} alt="PayPal" className="w-10" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-primary">PayPal</h3>
                <p className="text-sm text-gray-500">
                  {stats?.paypalEmail ? 
                    `Send to: ${stats.paypalEmail}` : 
                    'Get paid directly to your PayPal account'}
                </p>
              </div>
            </button>

            {selectedMethod === 'paypal' && !stats?.paypalEmail && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PayPal Email
                </label>
                <input
                  type="email"
                  value={tempPaypalEmail}
                  onChange={(e) => setTempPaypalEmail(e.target.value)}
                  placeholder="Enter your PayPal email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-2 text-xs text-gray-600">
                  This email will be saved to your profile for future withdrawals
                </p>
              </div>
            )}

            <button 
              onClick={() => setSelectedMethod('stripe')}
              className={`w-full flex items-center gap-4 p-4 border rounded-lg hover:border-secondary transition-colors ${selectedMethod === 'stripe' ? 'border-secondary bg-secondary/10' : ''}`}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard size={24} className="text-secondary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-primary">Stripe</h3>
                <p className="text-sm text-gray-500">
                  {stats?.stripeAccountId ? 
                    `Account ID: ${stats.stripeAccountId}` : 
                    'Get paid via Stripe Connect'}
                </p>
              </div>
            </button>

            {selectedMethod === 'stripe' && !stats?.stripeAccountId && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stripe Account ID
                </label>
                <input
                  type="text"
                  value={tempStripeId}
                  onChange={(e) => setTempStripeId(e.target.value)}
                  placeholder="Enter your Stripe account ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-2 text-xs text-gray-600">
                  This ID will be saved to your profile for future withdrawals
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-primary">Withdraw Funds</h2>
            
            <div className="mb-4">
              <div className="font-medium mb-2 text-primary">Amount</div>
              <div className="text-2xl font-bold">${stats?.withdrawableBalance}</div>
              <div className="text-sm text-gray-600">
                Minimum withdrawal amount: $50
              </div>
            </div>

            <div className="mb-4">
              <div className="font-medium mb-2">Select Payment Method</div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedMethod('stripe')}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
                    selectedMethod === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <CreditCard size={24} />
                  <span>Stripe</span>
                </button>
                <button
                  onClick={() => setSelectedMethod('paypal')}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
                    selectedMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <img src="/paypal.svg" alt="PayPal" className="w-6 h-6" />
                  <span>PayPal</span>
                </button>
              </div>
              {selectedMethod === 'stripe' && (
                <div className="mt-4 text-sm text-gray-600">
                  You'll be redirected to Stripe to set up your account for direct deposits.
                </div>
              )}
              {selectedMethod === 'paypal' && (
                <div className="mt-4 text-sm text-gray-600">
                  Funds will be sent to your connected PayPal account.
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentMethodSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payout History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-primary">Payout History</h2>
            <button className="flex items-center gap-2 text-primary hover:text-secondary">
              <Download size={20} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-6 text-primary">Transaction ID</th>
                <th className="text-left py-3 px-6 text-primary">Date</th>
                <th className="text-left py-3 px-6 text-primary">Method</th>
                <th className="text-right py-3 px-6 text-primary">Amount</th>
                <th className="text-right py-3 px-6 text-primary">Status</th>
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