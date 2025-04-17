import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ---------------------------------------------------------------------------
// 1. Define Your Domain Types (Replace these `any` types with your real types)
// ---------------------------------------------------------------------------
type Profile = any;
type Mentor = any;
type Mentee = any;
type Class = any;
type Session = any;
type Message = any;
type Notification = any;
type Goal = any;
type Progress = any;

// ---------------------------------------------------------------------------
// 2. Create the API Slice with proper type annotations
// ---------------------------------------------------------------------------
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      // Cast getState() to your RootState type (which should include auth)
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Profile',
    'Sessions',
    'Messages',
    'Notifications',
    'Mentees',
    'Mentors',
    'Students',
    'Teachers',
    'Tutors',
    'Tutees',
    'Classes',
    'Goals',
    'Progress',
  ],
  endpoints: (builder) => ({
    // ------------------------
    // Profile Endpoints
    // ------------------------
    getProfile: builder.query<Profile, void>({
      query: (): string => '/profile',
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<Profile, Partial<Profile>>({
      query: (data: Partial<Profile>) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    // ------------------------
    // Mentor Endpoints
    // ------------------------
    getMentors: builder.query<Mentor[], void>({
      query: (): string => '/mentors',
      providesTags: ['Mentors'],
    }),
    getMentor: builder.query<Mentor, number | string>({
      query: (id: number | string): string => `/mentors/${id}`,
      providesTags: ['Mentors'],
    }),

    // ------------------------
    // Mentee Endpoints
    // ------------------------
    getMentees: builder.query<Mentee[], void>({
      query: (): string => '/mentees',
      providesTags: ['Mentees'],
    }),
    getMentee: builder.query<Mentee, number | string>({
      query: (id: number | string): string => `/mentees/${id}`,
      providesTags: ['Mentees'],
    }),

    // ------------------------
    // Class Endpoints
    // ------------------------
    getClasses: builder.query<Class[], void>({
      query: (): string => '/classes',
      providesTags: ['Classes'],
    }),
    getClass: builder.query<Class, number | string>({
      query: (id: number | string): string => `/classes/${id}`,
      providesTags: ['Classes'],
    }),

    // ------------------------
    // Sessions Endpoints
    // ------------------------
    getSessions: builder.query<Session[], Record<string, unknown> | void>({
      query: (params?) => ({
        url: '/sessions',
        params,
      }),
      providesTags: ['Sessions'],
    }),
    getSessionById: builder.query<Session, number | string>({
      query: (id: number | string): string => `/sessions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Sessions', id }],
    }),
    createSession: builder.mutation<Session, any>({
      query: (data: any) => ({
        url: '/sessions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Sessions'],
    }),
    updateSession: builder.mutation<Session, { id: number | string } & any>({
      query: ({ id, ...data }) => ({
        url: `/sessions/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Sessions', id },
        'Sessions',
      ],
    }),
    deleteSession: builder.mutation<{ success: boolean }, number | string>({
      query: (id: number | string) => ({
        url: `/sessions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sessions'],
    }),

    // ------------------------
    // Messages Endpoints
    // ------------------------
    getMessages: builder.query<Message[], Record<string, unknown> | void>({
      query: (params?) => ({
        url: '/messages',
        params,
      }),
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation<Message, any>({
      query: (data: any) => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Messages'],
    }),

    // ------------------------
    // Notifications Endpoints
    // ------------------------
    getNotifications: builder.query<Notification[], void>({
      query: (): string => '/notifications',
      providesTags: ['Notifications'],
    }),
    markNotificationRead: builder.mutation<Notification, number | string>({
      query: (id: number | string) => ({
        url: `/notifications/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notifications'],
    }),

    // ------------------------
    // Goals Endpoints
    // ------------------------
    getGoals: builder.query<Goal[], void>({
      query: (): string => '/goals',
      providesTags: ['Goals'],
    }),
    updateGoal: builder.mutation<Goal, { id: number | string } & any>({
      query: ({ id, ...data }) => ({
        url: `/goals/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Goals'],
    }),
    createGoal: builder.mutation<Goal, any>({
      query: (data: any) => ({
        url: '/goals',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Goals'],
    }),

    // ------------------------
    // Progress Endpoints
    // ------------------------
    getProgress: builder.query<Progress[], Record<string, unknown> | void>({
      query: (params?) => ({
        url: '/progress',
        params,
      }),
      providesTags: ['Progress'],
    }),
    updateProgress: builder.mutation<Progress, { id: number | string } & any>({
      query: ({ id, ...data }) => ({
        url: `/progress/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Progress'],
    }),
  }),
});

// ---------------------------------------------------------------------------
// 3. Export auto-generated hooks for usage in components.
// ---------------------------------------------------------------------------
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetMentorsQuery,
  useGetMentorQuery,
  useGetMenteesQuery,
  useGetMenteeQuery,
  useGetClassesQuery,
  useGetClassQuery,
  useGetSessionsQuery,
  useGetSessionByIdQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useGetGoalsQuery,
  useUpdateGoalMutation,
  useCreateGoalMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
} = api;
