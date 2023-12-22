import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { baseQuery } from './baseQuery';
import { signOut } from 'next-auth/react';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (!mutex.isLocked()) {
    const release = await mutex.acquire();
    try {
      if (result.meta?.response && result.meta.response.status === 401) {
        signOut();
      }
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};
