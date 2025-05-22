import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Bell, Shield, CreditCard, Camera } from 'lucide-react';
import { RootState, AppDispatch } from '../../store/store';
import { updateProfile, uploadAvatar } from '../../store/slices/profileSlice';
import toast from 'react-hot-toast';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  bio: string;
  stripeAccountId: string;
  paypalEmail: string;
}

const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState('profile');
  const { data: profile, loading } = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    bio: '',
    stripeAccountId: '',
    paypalEmail: '',
    });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        company: profile.company || '',
        position: profile.position || '',
        bio: profile.bio || '',
        stripeAccountId: profile.stripeAccountId || '',
        paypalEmail: profile.paypalEmail || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
    }
  }, [selectedImage]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    try {
      await dispatch(uploadAvatar(file)).unwrap();
      toast.success('Avatar uploaded successfully');
    } catch {
      toast.error('Failed to upload avatar');
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-primary">Settings</h1>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b px-6">
          <div className="flex overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'payment', label: 'Payment', icon: CreditCard },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium ${
                  activeTab === tab.id
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-primary hover:text-primary/80'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : profile?.avatarUrl ? (
                    <img src={`${import.meta.env.VITE_BASE_URL}${profile.avatarUrl}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={40} className="text-secondary" />
                    </div>
                  )}
                </div>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-1 bg-primary/30 rounded-full cursor-pointer hover:bg-primary/80">
                  <Camera className="w-4 h-4 text-primary" />
                  <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>
              <div>
                <p className="text-sm text-gray-600">Click the camera icon to upload a new photo</p>
                <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'fullName', label: 'Full Name' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Phone', type: 'tel' },
                { name: 'company', label: 'Company' },
                { name: 'position', label: 'Position' },
                { name: 'stripeAccountId', label: 'Stripe Account ID' },
                { name: 'paypalEmail', label: 'PayPal Email' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-primary mb-1">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full px-4 py-2 border focus:border-1 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-transparent h-32"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white font-medium ${
                  loading ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-secondary'
                }`}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
            <p className="text-gray-500">You can add notification preferences here.</p>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
            <p className="text-gray-500">You can add password change, 2FA, etc.</p>
          </div>
        )}

        {activeTab === 'payment' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Settings</h2>
            <p className="text-gray-500">You can add billing and card info here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
