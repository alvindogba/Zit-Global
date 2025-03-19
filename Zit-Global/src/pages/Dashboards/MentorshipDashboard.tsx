import { useState, useEffect } from 'react';
import { useDaily, DailyProvider } from '@daily-co/daily-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FaComments, FaTasks, FaCalendarAlt, FaChartLine, 
  FaVideo, FaBell, FaTimes, FaCheck, FaUserGraduate,
  FaChalkboardTeacher, FaSearch, FaArrowRight, FaGlobe,
  FaLightbulb, FaRocket, FaUsers
} from 'react-icons/fa';
import { DailyCall } from '@daily-co/daily-js';

// Video Call Interface Component
const VideoCallInterface = ({ callFrame, onClose }: { callFrame: DailyCall | null, onClose: () => void }) => {
  const daily = useDaily();
  const [participants, setParticipants] = useState<any[]>([]);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  useEffect(() => {
    if (!daily) return;

    const updateParticipants = () => {
      setParticipants(Object.values(daily.participants()));
    };

    daily.on('participant-joined', updateParticipants);
    daily.on('participant-updated', updateParticipants);
    daily.on('participant-left', updateParticipants);

    return () => {
      daily.off('participant-joined', updateParticipants);
      daily.off('participant-updated', updateParticipants);
      daily.off('participant-left', updateParticipants);
    };
  }, [daily]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        <div className="flex justify-between p-4 bg-gray-900">
          <h2 className="text-white text-xl font-semibold">Mentorship Session</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        
        {/* Main Video Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {participants.map(participant => (
            <div 
              key={participant.session_id}
              className="relative bg-gray-800 rounded-lg overflow-hidden"
            >
              <video
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                ref={el => {
                  if (el && daily) daily.attachVideoElement(el, participant.session_id);
                }}
              />
              <div className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded">
                {participant.user_name}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-900 flex justify-center gap-4">
          <button
            onClick={() => {
              daily?.setLocalAudio(!micEnabled);
              setMicEnabled(!micEnabled);
            }}
            className={`p-3 rounded-full ${micEnabled ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            {micEnabled ? 'Mic On' : 'Mic Off'}
          </button>
          <button
            onClick={() => {
              daily?.setLocalVideo(!cameraEnabled);
              setCameraEnabled(!cameraEnabled);
            }}
            className={`p-3 rounded-full ${cameraEnabled ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            {cameraEnabled ? 'Camera On' : 'Camera Off'}
          </button>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-red-600 text-white"
          >
            Leave Call
          </button>
        </div>
      </div>
    </div>
  );
};

// Notification System Component
const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/notifications`);
    
    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    };

    return () => ws.close();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`);
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
      >
        <FaBell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {notification.type === 'message' ? (
                        <FaComments className="text-blue-600 mt-1" />
                      ) : notification.type === 'session' ? (
                        <FaVideo className="text-green-600 mt-1" />
                      ) : (
                        <FaCheck className="text-purple-600 mt-1" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="p-4 text-sm text-gray-500">No new notifications</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Dashboard Component
const MentorshipDashboard = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { userData, role } = state || {};
    const [activeCall, setActiveCall] = useState<DailyCall | null>(null);
    const [showVideoCall, setShowVideoCall] = useState(false);

    useEffect(() => {
        if (!userData) {
            navigate('/mentorship');
        }
    }, [userData, navigate]);

    const startVideoCall = async (sessionId: string) => {
        try {
            const response = await axios.post(`/api/sessions/${sessionId}/start-call`);
            const call = window.DailyIframe.createCallObject({
                url: response.data.url,
                apiKey: import.meta.env.VITE_DAILY_API_KEY,
            });
            setActiveCall(call);
            setShowVideoCall(true);
            await call.join();
        } catch (error) {
            console.error("Error starting call:", error);
        }
    };

    return (
        <DailyProvider callObject={activeCall}>
            <div className="min-h-screen bg-gray-50 p-8">
                {/* Header with Notification */}
                <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome, {userData?.firstName}!
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {role === 'mentor' 
                                ? "Your expertise is changing lives."
                                : "Your learning journey begins here."}
                        </p>
                    </motion.div>
                    <Notifications />
                </div>

                {/* Video Call Interface */}
                {showVideoCall && activeCall && (
                    <VideoCallInterface 
                        callFrame={activeCall}
                        onClose={() => {
                            activeCall.leave();
                            setShowVideoCall(false);
                        }}
                    />
                )}

                {/* Dashboard Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Matches Card */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <FaComments className="text-blue-600 w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold">
                                    {role === 'mentor' ? 'Current Mentees' : 'Your Mentors'}
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {userData?.matches?.map((match: any) => (
                                    <div key={match.id} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                                        <div>
                                            <p className="font-medium">{match.name}</p>
                                            <p className="text-sm text-gray-600">{match.expertise}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Schedule Card */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <FaCalendarAlt className="text-green-600 w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
                            </div>
                            <div className="space-y-3">
                                {userData?.sessions?.map((session: any) => (
                                    <div key={session.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{session.title}</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(session.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => startVideoCall(session.id)}
                                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200"
                                        >
                                            Join
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Progress Card */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <FaChartLine className="text-purple-600 w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold">Learning Progress</h3>
                            </div>
                            <div className="h-40">
                                <div className="flex items-center justify-center h-full">
                                    <div className="relative w-24 h-24">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle
                                                className="text-gray-200"
                                                strokeWidth="10"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="transparent"
                                            />
                                            <circle
                                                className="text-blue-600"
                                                strokeWidth="10"
                                                strokeDasharray={`${userData?.progress || 0} 100`}
                                                strokeLinecap="round"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="transparent"
                                            />
                                        </svg>
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
                                            {userData?.progress || 0}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Card */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <FaTasks className="text-orange-600 w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold">Quick Actions</h3>
                            </div>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    Update Availability
                                </button>
                                <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    Set New Goals
                                </button>
                                <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    View Resources
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            {userData?.activity?.map((activity: any) => (
                                <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                                    <div className={`p-2 rounded-lg ${activity.type === 'session' ? 'bg-blue-100' : 'bg-green-100'}`}>
                                        {activity.type === 'session' ? (
                                            <FaComments className="text-blue-600" />
                                        ) : (
                                            <FaTasks className="text-green-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">{activity.title}</p>
                                        <p className="text-sm text-gray-600">{activity.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DailyProvider>
    );
};

export default MentorshipDashboard;