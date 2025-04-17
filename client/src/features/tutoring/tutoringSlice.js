import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API calls - replace with real API calls later
const mockApi = {
  fetchSessions: () => Promise.resolve(MOCK_SESSIONS),
  fetchMessages: () => Promise.resolve(MOCK_MESSAGES),
  sendMessage: (message) => Promise.resolve({ ...message, id: Date.now() }),
  scheduleSession: (session) => Promise.resolve({ ...session, id: Date.now() }),
  updateSession: (session) => Promise.resolve(session),
};

// Async thunks
export const fetchSessions = createAsyncThunk(
  'tutoring/fetchSessions',
  async () => {
    const response = await mockApi.fetchSessions();
    return response;
  }
);

export const fetchMessages = createAsyncThunk(
  'tutoring/fetchMessages',
  async () => {
    const response = await mockApi.fetchMessages();
    return response;
  }
);

export const sendMessage = createAsyncThunk(
  'tutoring/sendMessage',
  async (message) => {
    const response = await mockApi.sendMessage(message);
    return response;
  }
);

export const scheduleSession = createAsyncThunk(
  'tutoring/scheduleSession',
  async (session) => {
    const response = await mockApi.scheduleSession(session);
    return response;
  }
);

export const updateSession = createAsyncThunk(
  'tutoring/updateSession',
  async (session) => {
    const response = await mockApi.updateSession(session);
    return response;
  }
);

const initialState = {
  sessions: [],
  messages: {},
  activeSession: null,
  activeConversation: null,
  loading: {
    sessions: false,
    messages: false,
  },
  error: null,
};

const tutoringSlice = createSlice({
  name: 'tutoring',
  initialState,
  reducers: {
    setActiveSession: (state, action) => {
      state.activeSession = action.payload;
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Sessions
      .addCase(fetchSessions.pending, (state) => {
        state.loading.sessions = true;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading.sessions = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading.sessions = false;
        state.error = action.error.message;
      })
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading.messages = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading.messages = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading.messages = false;
        state.error = action.error.message;
      })
      // Send Message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { conversationId } = action.payload;
        if (!state.messages[conversationId]) {
          state.messages[conversationId] = [];
        }
        state.messages[conversationId].push(action.payload);
      })
      // Schedule Session
      .addCase(scheduleSession.fulfilled, (state, action) => {
        state.sessions.push(action.payload);
      })
      // Update Session
      .addCase(updateSession.fulfilled, (state, action) => {
        const index = state.sessions.findIndex(
          (session) => session.id === action.payload.id
        );
        if (index !== -1) {
          state.sessions[index] = action.payload;
        }
      });
  },
});

// Mock data
const MOCK_SESSIONS = [
  {
    id: 1,
    tutor: {
      id: 1,
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=60A5FA&color=ffffff',
      rating: 4.8,
    },
    tutee: {
      id: 1,
      name: 'Alex Chen',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=60A5FA&color=ffffff',
    },
    subject: 'Mathematics',
    topic: 'Calculus - Derivatives',
    status: 'scheduled',
    startTime: '2025-04-12T14:00:00Z',
    duration: 60,
  },
  {
    id: 2,
    tutor: {
      id: 1,
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=60A5FA&color=ffffff',
      rating: 4.8,
    },
    tutee: {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=60A5FA&color=ffffff',
    },
    subject: 'Physics',
    topic: 'Mechanics - Forces',
    status: 'scheduled',
    startTime: '2025-04-12T16:00:00Z',
    duration: 60,
  },
];

const MOCK_MESSAGES = {
  1: [
    {
      id: 1,
      conversationId: 1,
      senderId: 1,
      senderType: 'tutee',
      content: 'Hi, I have a question about the calculus homework',
      timestamp: '2025-04-12T08:30:00Z',
    },
    {
      id: 2,
      conversationId: 1,
      senderId: 1,
      senderType: 'tutor',
      content: 'Sure, what do you need help with?',
      timestamp: '2025-04-12T08:31:00Z',
    },
  ],
  2: [
    {
      id: 1,
      conversationId: 2,
      senderId: 2,
      senderType: 'tutor',
      content: 'Great progress on your last assignment!',
      timestamp: '2025-04-12T07:45:00Z',
    },
  ],
};

export const { setActiveSession, setActiveConversation, clearError } = tutoringSlice.actions;

export default tutoringSlice.reducer;
