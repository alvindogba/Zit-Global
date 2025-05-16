import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart, Users, DollarSign, Link as LinkIcon,
  LogOut, Settings, Bell, Menu,
  Home, CreditCard, PieChart, MessageSquare
} from 'lucide-react';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { fetchProfile } from '../store/slices/profileSlice';
import { fetchReferralStats } from '../store/slices/referralSlice';

// Import all the pages
import Analytics from '../pages/dashboard/Analytics';
import Referrals from '../pages/dashboard/Referrals';
import Payouts from '../pages/dashboard/Payouts';
import Support from '../pages/dashboard/Support';
import DashboardSettings from '../pages/dashboard/Settings';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get user and profile data from state
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: profile } = useSelector((state: RootState) => state.profile);
  const { stats } = useSelector((state: RootState) => state.referral);
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
     setIsCopy(true);
      toast.success("Referral link copied to clipboard!");
      // Reset after 2 seconds
      setTimeout(() => setIsCopy(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy referral link.");
    }
  };
  useEffect(() => {
    dispatch(fetchProfile() as any);
    dispatch(fetchReferralStats() as any);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Overview' },
    { path: '/dashboard/analytics', icon: BarChart, label: 'Analytics' },
    { path: '/dashboard/referrals', icon: Users, label: 'Referrals' },
    { path: '/dashboard/payouts', icon: CreditCard, label: 'Payouts' },
  ];

  const supportItems = [
    { path: '/dashboard/support', icon: MessageSquare, label: 'Support' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  // Use user data from auth state, fallback to profile data if needed
  const userInitial = user?.fullName?.charAt(0) || profile?.fullName?.charAt(0) || 'U';
  const userName = user?.fullName || profile?.fullName || 'User';
  const referralLink = profile?.referralLink || '111';

  // Safely access stats with null checks and default values
  const totalReferrals = stats?.length || 0;
  const totalAmountPaid = stats?.reduce((sum: number, r: any) => Number(sum) + Number(r.amount), 0) || 0;
  const totalCommission = stats?.reduce((sum: number, r: any) => Number(sum) + Number(r.commission), 0) || 0;
  const userBalance = totalCommission;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Partner(ZIT)
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-2">
                {supportItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${location.pathname === item.path
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button
                  className="md:hidden text-gray-500"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <Menu size={24} />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative">
                  <button className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {userInitial}
                      </span>
                    </div>
                    <span className="text-gray-700 hidden sm:inline">
                      {userName}
                    </span>

                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4 ">
                      <h3 className="text-gray-500 text-sm">Total Earnings</h3>
                      <DollarSign className="text-blue-500" size={20} />
                    </div>
                    <p className="text-2xl font-bold ">${totalCommission.toFixed(2)}</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm">Active Referrals</h3>
                      <Users className="text-blue-500" size={20} />
                    </div>
                    <p className="text-2xl font-bold">{totalReferrals}</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm">Total Amount</h3>
                      <BarChart className="text-blue-500" size={20} />
                    </div>
                    <p className="text-2xl font-bold">${totalAmountPaid}</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm">Available Balance</h3>
                      <DollarSign className="text-blue-500" size={20} />
                    </div>
                    <p className="text-2xl font-bold">${userBalance}</p>
                    <button className="mt-2 text-sm text-blue-600 font-medium">Withdraw</button>
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Referral Link */}
                  <div className="lg:col-span-2 bg-white rounded-lg shadow">
                    <div className="p-6">
                      <h2 className="text-lg font-semibold mb-4">Your Referral Link</h2>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={referralLink}
                          readOnly
                          className="flex-1 bg-gray-50 px-4 py-2 rounded-lg text-gray-600"
                        />
                        <button
                          onClick={handleCopy}
                          className={`px-4 py-2 rounded-lg text-white transition-all duration-200 ${isCopy ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                          {isCopy ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                      <div className="space-y-2">
                        <Link
                          to="/dashboard/settings"
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                        >
                          <Settings size={18} className="text-gray-400" />
                          <span>Account Settings</span>
                        </Link>
                        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3">
                          <LinkIcon size={18} className="text-gray-400" />
                          <span>Marketing Materials</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-3 text-red-600"
                        >
                          <LogOut size={18} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<DashboardSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;