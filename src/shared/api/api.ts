import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQueryWithReAuth';

export const emptyApi = createApi({
  reducerPath: 'api',
  tagTypes: ['pages', 'courses'],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
