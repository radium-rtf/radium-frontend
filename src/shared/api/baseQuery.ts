import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session) {
      headers.append('Authorization', `Bearer ${session.user.accessToken}`);
    }
    return headers;
  },
});
